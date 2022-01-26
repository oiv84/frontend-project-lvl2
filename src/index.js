import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const compaireTwoFiles = (filepath1, filepath2) => {
  const file1 = parse(path.resolve(process.cwd(), filepath1));
  const file2 = parse(path.resolve(process.cwd(), filepath2));

  const keys = _.orderBy(_.union(Object.keys(file1), Object.keys(file2)));

  const compare = (key) => {
    if (_.has(file1, key)) {
      if (_.has(file2, key)) {
        if (file1[key] === file2[key]) {
          return `    ${key}: ${file1[key]}\n`;
        }
        return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
      }
      return `  - ${key}: ${file1[key]}\n`;
    }
    return `  + ${key}: ${file2[key]}\n`;
  };

  const diff = keys.map((key) => compare(key));

  return `{\n${diff.join('')}}`;
};

export default compaireTwoFiles;
