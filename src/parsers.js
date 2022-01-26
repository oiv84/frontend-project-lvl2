import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parseFile = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8');
  const fileExt = path.extname(filePath);

  const parseEngine = {
    '.json': JSON.parse,
    '.yaml': yaml.load,
    '.yml': yaml.load,
  };

  return parseEngine[fileExt](file);
};

export default parseFile;
