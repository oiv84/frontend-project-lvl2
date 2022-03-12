import path from 'path';
import fs from 'fs';

import format from './formatters/index.js';
import parse from './parsers.js';
import buildAst from './astBuilder.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);
const getFile = (filePath) => fs.readFileSync(getFullPath(filePath), 'utf8');
const getFormat = (filePath) => path.extname(filePath).replace('.', '');

const genDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = parse(getFile(filePath1), getFormat(filePath1));
  const data2 = parse(getFile(filePath2), getFormat(filePath2));

  const ast = buildAst(data1, data2);

  const diff = format(ast, outputFormat);

  return diff;
};

export default genDiff;
