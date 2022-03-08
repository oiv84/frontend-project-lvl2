import stylish from './stylish.js';

const formatMapping = {
  stylish,
};

export default (ast, outputFormat = 'stylish') => {
  const format = formatMapping[outputFormat];
  return format(ast);
};
