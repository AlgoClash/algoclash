import * as Babel from "@babel/standalone";

const transpile = (currentInputCode) => {
  let currentTranspiledCode = "";
  let error = {};
  try {
    currentTranspiledCode = Babel.transform(currentInputCode, { presets: ['env', 'react'] }).code;
    error = {show: false, errorMessage: null};
    return [currentTranspiledCode, error];
  } catch (error) {
    error = {show: true, errorMessage: error.message}
    return [currentTranspiledCode, error];
  }
}

export default transpile;