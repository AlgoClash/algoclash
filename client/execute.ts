import transpile from './transpile';

interface evaluatedCode {
  code: Function;
  log: string;
}

const executeCode = (code): evaluatedCode  => {
  try {
    const [output, error] = transpile(code);

    let consolelog = '';

    const override = (log): string => {
      let text = String(log);
      let parsed;
  
      try {
        parsed = String(JSON.parse(text));
      } catch (error) {
        parsed = text;
      }
      
      return consolelog = parsed;

    };

    (function () {
      const originalError = <any>console.error;
      const originalLog = console.log;
  
      console.error = function (error) {
        override(error.stack);
        originalError.apply(console, arguments);
      };
      console.log = function (...args) {
        args.forEach(override);
        originalLog.apply(console, args);
      };
    })();

    (new Function(output))();

    const message: evaluatedCode = {
      code: new Function(output),
      log: error.show ? error.errorMessage : consolelog
    }

    return message;

  } catch (error) {

    const message: evaluatedCode = {
      code: new Function(''),
      log: error.toString()
    }

    return error.toString();
  }
}

export default executeCode;