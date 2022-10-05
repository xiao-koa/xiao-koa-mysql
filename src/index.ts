import 'reflect-metadata'

import { load } from './decorator'

export * from './decorator'

export default (dir: string, ServiceMap: Map<string, Object>, configJson: any) => {
  const currentServiceMap = load(dir, configJson)

  for (var [key, value] of currentServiceMap) {
    ServiceMap.set(key, value)
  }
}
