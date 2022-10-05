export declare type Prototype = {
    constructor: Function;
} & any;
export declare type Constructor = {
    new (...args: any[]): {
        name: string;
    };
};
export interface FunctionAnnotation {
    <T>(target: Prototype, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<T>): void;
}
export interface ConstructorAnnotation {
    <T extends Constructor>(constructor: T): T;
}
export interface PropertyAnnotation {
    (target: Prototype, propertyKey: PropertyKey): void;
}
export interface ParameterAnnotation {
    (target: Prototype, propertyKey: PropertyKey, parameterIndex: number): void;
}
export declare type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'options' | 'patch' | 'head';
export declare enum Features {
    BaseUrl = 0,
    DataParams = 1
}
export declare type paramsType = 'PathVariable' | 'RequestHeader' | 'RequestBody';
export declare type curInterceptorType = {
    fn: Function;
    addPath: string[];
    excludePath: string[];
};
