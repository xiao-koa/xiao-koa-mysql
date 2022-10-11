import { firstToLowerCase, getFileList, getFunctionArgsName } from './common'
import mysql from 'mysql'
import { FunctionAnnotation } from './decoratorType'

const projectFile: string[] = []

let sqlConfig: any

var pool: mysql.Pool

export const load = (folder: string, JsonStr: any): any => {
  sqlConfig = JsonStr['mysql']

  pool = mysql.createPool({
    connectionLimit: sqlConfig?.connectionLimit ?? 10,
    host: String(sqlConfig?.host ?? null),
    user: String(sqlConfig?.user ?? null),
    password: String(sqlConfig?.password ?? null),
    database: String(sqlConfig?.database ?? null),
  })
  // 第一回合查询是否能链接成功,用于报错用户名密码错误
  pool.getConnection(function (err) {
    if (err) {
      console.log(err)
      return
    }
  })

  getFileList(folder, projectFile)

  projectFile.map((item) => {
    require(item)
  })

  return CurrentServiceMap
}

var db: any = {}

db.query = function (sql: any) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }

      connection.query(sql, function (error, results) {
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

            const spliceReg = new RegExp(`#{+\s*${item}+\s*}`, 'g')
            const evalReg = new RegExp(`&{+\s*${item}+\s*}`, 'g')

            if (spliceReg.test(sql)) {
              sql = sql.replace(spliceReg, `'${args[index]}'`)
            } else if (evalReg.test(sql)) {
              sql = sql.replace(evalReg, `${args[index]}`)
            }
          })

          // 这里想办法让他不解析，在启动时就拼接好
          console.log(`sql查询${sql}`)

          return await db.query(sql)
        },
      })
      currentService[propertyKey] = p
    })
  }
}
