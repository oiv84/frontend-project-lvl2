const stylish = (ast, indentSize = 2) => {
  const indent = (' ').repeat(indentSize);

  const diff = ast.map((item) => {
    if (item.status === 'removed') {
      return `${indent}- ${item.key}: ${item.value}\n`;
    }

    if (item.status === 'added') {
      return `${indent}+ ${item.key}: ${item.value}\n`;
    }

    if (item.status === 'changed') {
      return `${indent}- ${item.key}: ${item.oldValue}\n${indent}+ ${item.key}: ${item.newValue}\n`;
    }

    return `${indent}${indent}${item.key}: ${item.value}\n`;
  });

  return `{\n${diff.join('')}}`;
};

export default (ast) => stylish(ast, 2);
