const fs = require('fs');
const transformCode = (input) => {
  const regex = /(var|let|const)\s+(\w+)\s*\((\w+)\/(\w+)\)\s*=\s*(.*?);/g;
  const transformedCode = input.replace(
    regex,
    (match, type, name, param1, param2, value) => {
      return `${type} ${name} = { name: "${name}", value: ${value}, p1: "${param1}", p2: "${param2}" };`;
    }
  );
  return transformedCode;
};
const checkVariableFormat = (code) => {
  const regexWithAssignment = /(var|let|const)\s+\w+\(\w+\/\w+\)\s*=\s*.+/g;
  const regexWithoutAssignment = /(var|let|const)\s+\w+\(\w+\/\w+\);/g;
  const statements = code.split(/;|\n/);
  for (let i = 0; i < statements.length; i++) {
    if (statements[i].trim().match(/(var|let|const)\s+\w+\s*;/g)) {
      if (
        !statements[i].trim().match(regexWithAssignment) &&
        !statements[i].trim().match(regexWithoutAssignment)
      ) {
        throw new Error('No gender defined at line ' + (i + 1));
      }
    }
  }
};

let filler = fs.readFileSync(require.resolve('./filler.js')).toString();

let run = (code) => {
  let tr = transformCode(code);
  checkVariableFormat(code);
  new Function(filler + tr)();
};

let transpile = (code) => {
  let tr = transformCode(code);
  checkVariableFormat(code);
  return filler + tr;
};

module.exports = { run, transpile };
