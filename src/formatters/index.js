import stylish from './stylish.js';
import plain from './plain.js';

const formatMapping = {
  stylish,
  plain,
};

export default (ast, outputFormat = 'stylish') => {
  const format = formatMapping[outputFormat];
  return format(ast);
};
