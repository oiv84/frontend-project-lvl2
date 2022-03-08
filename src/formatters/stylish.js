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
    const buildLine = (key, value) => `${indent(spaces)}  ${key} ${node.key}: ${stringify(value, spaces + 1)}`;
    const stylishMapping = {
      hasChildren: () => (`${indent(spaces)}    ${node.key}: ${stylish(node.value, spaces + 1)}`),
      added: () => (buildLine('+', node.value)),
      removed: () => (buildLine('-', node.value)),
      changed: () => (`${indent(spaces)}  - ${node.key}: ${stringify(node.oldValue, spaces + 1)}\n ${indent(spaces)} + ${node.key}: ${stringify(node.newValue, spaces + 1)}`),
      unchanged: () => (buildLine(' ', node.value)),
    };
    return stylishMapping[node.status]();
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(spaces)}}`;
};

export default stylish;
