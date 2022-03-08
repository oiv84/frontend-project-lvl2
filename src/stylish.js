import _ from 'lodash';

const indent = (spaces) => ('    '.repeat(spaces));

const stringify = (value, spaces = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value).map((node) => `${indent(spaces)}    ${node}: ${stringify(value[node], spaces + 1)}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(spaces)}}`;
};

const stylish = (ast, spaces = 0) => {
  const lines = ast.map((node) => {
    const buildLine = (char, value) => `${indent(spaces)}  ${char} ${node.key}: ${stringify(value, spaces + 1)}`;
    switch (node.status) {
      case 'removed':
        return buildLine('-', node.value);
      case 'unchanged':
        return buildLine(' ', node.value);
      case 'changed':
        return `${indent(spaces)}  - ${node.key}: ${stringify(node.oldValue, spaces + 1)}\n ${indent(spaces)} + ${node.key}: ${stringify(node.newValue, spaces + 1)}`;
      case 'added':
        return buildLine('+', node.value);
      default:
        return `${indent(spaces)}    ${node.key}: ${stylish(node.value, spaces + 1)}`;
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(spaces)}}`;
};

export default stylish;
