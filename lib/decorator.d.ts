import { FunctionAnnotation } from './decoratorType';
export declare let CurrentServiceMap: Map<string, Object>;
export declare function Mapping(alias?: string): (target: any) => void;
export declare const Sql: (sql: string) => FunctionAnnotation;
export declare const load: (folder: string) => any;
