import stylish from './stylish.js';
import plain from './plain.js';

const formatMapping = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (ast, outputFormat) => {
  const format = formatMapping[outputFormat];

  if (!format) {
    throw new Error(`There is no "${outputFormat}" formatter`);
  }

  return format(ast);
};
