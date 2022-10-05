export declare const getFileList: (dir: string, projectFile: string[]) => void;
export declare const firstToLowerCase: (name: string) => string;
/**
 * 因为Object.keys() 如果函数的参数名有叫name的那么就会被覆盖，所以不得不自己写一个处理函数参数名
 * @param funcString 函数的toString()
 * @returns 函数参数名
 */
export declare function getFunctionArgsName(funcString: string): string[];
