import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parseMapping = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
};

export default (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8');
  const fileExt = path.extname(filePath);

  const parse = parseMapping[fileExt];

  if (!parse) {
    throw new Error(`There is now parser for "${fileExt}" files`);
  }

  return parse(file);
};
