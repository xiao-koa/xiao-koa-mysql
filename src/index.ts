import 'reflect-metadata'

import { load } from './decorator'
export * from './decorator'

export default (dir: string): Function => {
  return (ServiceMap: Map<string, Object>) => {
    const currentServiceMap = load(dir)

    for (var [key, value] of currentServiceMap) {
      ServiceMap.set(key, value)
    }
  }
}
