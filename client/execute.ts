import transpile from './transpile';

export default function executeCode(code): string {
    try {
      return (new Function(transpile(code)))();
    } catch (error) {
      // console.error(error);
      return error.toString();
    }
}