import { firstToLowerCase, getFileList, getFunctionArgsName } from './common'
import mysql from 'mysql'
import { FunctionAnnotation } from './decoratorType'

const projectFile: string[] = []

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
})

var db: any = {}

db.query = function (sql: any, params: any) {
  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }

      connection.query(sql, params, function (error, results, fields) {
        console.log(`${sql}=>${params}`)
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(results)
      })
    })
  })
}

export let CurrentServiceMap: Map<string, Object> = new Map()

export function Mapping(alias?: string) {
  return function (target: any) {
    alias || false ? CurrentServiceMap.set(alias, new target()) : CurrentServiceMap.set(firstToLowerCase(target.name), new target())
  }
}

export const Sql = function (sql: string): FunctionAnnotation {
  return function (target, propertyKey) {
    process.nextTick(() => {
      let currentService = CurrentServiceMap.get(firstToLowerCase(target.constructor.name)) as any

      let funVarMap: any = {}
      let p = new Proxy(target[propertyKey], {
        apply: async function (target, thisBinding, args) {
          getFunctionArgsName(target.toString())?.map((item, index) => {
            funVarMap[item] = args[index]

            const reg = new RegExp(`#{+\s*${item}+\s*}`, 'g')

            sql = sql.replace(reg, args[index])
          })

          return await db.query(sql)
        },
      })
      currentService[propertyKey] = p
    })
  }
}

export const load = (folder: string): any => {
  getFileList(folder, projectFile)

  projectFile.map((item) => {
    require(item)
  })

  return CurrentServiceMap
}
