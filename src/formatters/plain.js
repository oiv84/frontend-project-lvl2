import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) return '[complex value]';
  if (_.isString(data)) return `'${data}'`;
  return data;
};

const plainMapping = {
  root: ({ children }, propertyParents, plain) => children.flatMap(
    (node) => plainMapping[node.type](node, propertyParents, plain),
  ),
  object: ({ key, children }, propertyParents, plain) => children.flatMap(
    (node) => plainMapping[node.type](node, [...propertyParents, key], plain),
  ),
  added: ({ key, value }, propertyParents) => `Property '${[...propertyParents, key].join('.')}' was added with value: ${stringify(value)}`,
  removed: ({ key }, propertyParents) => `Property '${[...propertyParents, key].join('.')}' was removed`,
  changed: ({ key, oldValue, newValue }, propertyParents) => `Property '${[...propertyParents, key].join('.')}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  unchanged: () => [],
};

const plain = (node, propertyParents) => plainMapping[node.type](node, propertyParents, plain).join('\n');

export default (ast) => plain(ast, []);
