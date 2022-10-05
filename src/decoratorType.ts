export type Prototype = {
  constructor: Function
} & any
export type Constructor = { new (...args: any[]): { name: string } }
export interface FunctionAnnotation {
  <T>(target: Prototype, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<T>): void
}
export interface ConstructorAnnotation {
  <T extends Constructor>(constructor: T): T
}
export interface PropertyAnnotation {
  (target: Prototype, propertyKey: PropertyKey): void
}
export interface ParameterAnnotation {
  (target: Prototype, propertyKey: PropertyKey, parameterIndex: number): void
}

export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'options' | 'patch' | 'head'
export enum Features {
  BaseUrl,
  DataParams,
}

export type paramsType = 'PathVariable' | 'RequestHeader' | 'RequestBody'



export type curInterceptorType = {
  fn: Function
  addPath: string[]
  excludePath: string[]
}