interface evaluatedCode {
    code: Function;
    log: string;
}
declare const executeCode: (code: any) => evaluatedCode;
export default executeCode;
