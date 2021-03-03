import transpile from './transpile';

const executeCode = (code): string => {
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

    return error.show ? error.errorMessage : ((new Function(output))(), consolelog);

  } catch (error) {
    return error.toString();
  }
}

export default executeCode;