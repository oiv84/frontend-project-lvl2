import path from 'path';

import stylish from './stylish.js';
import parse from './parsers.js';
import buildAst from './astBuilder.js';

const compareTwoFiles = (filepath1, filepath2) => {
  const data1 = parse(path.resolve(process.cwd(), filepath1));
  const data2 = parse(path.resolve(process.cwd(), filepath2));

  return stylish(buildAst(data1, data2));
};

export default (compareTwoFiles);
