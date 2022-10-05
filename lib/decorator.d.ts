import { FunctionAnnotation } from './decoratorType';
export declare const load: (folder: string, JsonStr: any) => any;
export declare let CurrentServiceMap: Map<string, Object>;
export declare function Mapping(alias?: string): (target: any) => void;
export declare const Sql: (sql: string) => FunctionAnnotation;
