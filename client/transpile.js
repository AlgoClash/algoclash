// import '@babel/standalone';

const OPTIONS = {
  presets: [ "react", ["es2015", { "modules": false }]]
};
  
export default function preprocess(str) {
  const { code } = Babel.transform(str, OPTIONS);
  console.log(code);

  return code;
};