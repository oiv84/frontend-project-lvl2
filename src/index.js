import path from 'path';

import format from './formatters/index.js';
import parse from './parsers.js';
import buildAst from './astBuilder.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = parse(getFullPath(filepath1));
  const data2 = parse(getFullPath(filepath2));

  const ast = buildAst(data1, data2);

  const diff = format(ast, outputFormat);

  return diff;
};

export default genDiff;
