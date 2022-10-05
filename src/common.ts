import fs from 'fs'
import path from 'path'

export const getFileList = (dir: string, projectFile: string[]) => {
  const stat = fs.statSync(dir)
  if (stat.isDirectory()) {
    const dirs = fs.readdirSync(dir)
    dirs.forEach((value) => {
      getFileList(path.join(dir, value), projectFile)
    })
  } else if (stat.isFile()) {
    if (path.extname(dir) !== '.ts' && path.extname(dir) !== '.js') {
      return
    } else {
      projectFile.push(dir)
    }
  }
}

export const firstToLowerCase = (name: string) => {
  return name.replace(name[0], name[0].toLowerCase())
}

/**
 * 因为Object.keys() 如果函数的参数名有叫name的那么就会被覆盖，所以不得不自己写一个处理函数参数名
 * @param funcString 函数的toString()
 * @returns 函数参数名
 */
export function getFunctionArgsName(funcString: string) {
  let startIndex = 0
  let EndIndex = 0

  let bracketsString = ''

  for (let i = 0; i < funcString.length; i++) {
    if (funcString[i] == '(' && startIndex == 0) {
      startIndex = i + 1
      continue
    }

    if (funcString[i] == ')' && EndIndex == 0) {
      EndIndex = i
      break
    }
  }

  bracketsString = funcString.substring(startIndex, EndIndex).replace(/\s+/g, '')
  return bracketsString.split(',')
}
