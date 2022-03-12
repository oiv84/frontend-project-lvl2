import yaml from 'js-yaml';

const parseMapping = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (file, format) => {
  const parse = parseMapping[format];

  if (!parse) {
    throw new Error(`There is now parser for "${format}" files`);
  }

  return parse(file);
};
