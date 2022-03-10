import _ from 'lodash';

const signs = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const indent = (spacesCount) => ' '.repeat(spacesCount);

const stringify = (data, depth, space) => {
  if (!_.isObject(data)) {
    return data;
  }

  const fields = Object.entries(data)
    .map(([key, value]) => `${indent((depth + 1) * space)}${key}: ${stringify(value, depth + 1, space)}`)
    .join('\n');

  return `{\n${fields}\n${indent(depth * space)}}`;
};

const buildLine = (key, value, depth, space, type) => `${indent(depth * space - signs[type].length)}${signs[type]}${key}: ${stringify(value, depth, space)}`;

const stylishMapping = {
  root: ({ children }, depth, space, stylish) => {
    const fields = children
      .flatMap((node) => stylishMapping[node.type](node, depth + 1, space, stylish))
      .join('\n');

    return `{\n${fields}\n}`;
  },

  object: ({ key, children }, depth, space, stylish) => {
    const fields = children
      .flatMap((node) => stylishMapping[node.type](node, depth + 1, space, stylish))
      .join('\n');

    return `${indent(depth * space)}${key}: {\n${fields}\n${indent(depth * space)}}`;
  },

  added: ({ key, value }, depth, space) => buildLine(key, value, depth, space, 'added'),

  removed: ({ key, value }, depth, space) => buildLine(key, value, depth, space, 'removed'),

  changed: ({ key, oldValue, newValue }, depth, space) => {
    const field1 = buildLine(key, oldValue, depth, space, 'removed');
    const field2 = buildLine(key, newValue, depth, space, 'added');

    return [field1, field2];
  },

  unchanged: ({ key, value }, depth, space) => buildLine(key, value, depth, space, 'unchanged'),
};

const stylish = (node, depth, space) => stylishMapping[node.type](node, depth, space, stylish);

export default (ast) => stylish(ast, 0, 4);
