import 'reflect-metadata'

import { load } from './decorator'

export * from './decorator'

export default (xiaoKoaConfig: any) => {
  const currentServiceMap = load(xiaoKoaConfig['dirPath'], xiaoKoaConfig['JsonStr'])

  for (var [key, value] of currentServiceMap) {
    xiaoKoaConfig['ServiceMap'].set(key, value)
  }
}
