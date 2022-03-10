import _ from 'lodash';

const sortedKeys = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  return _.sortBy(keys);
};

const buildNode = (data1, data2) => {
  const isObject = (key) => _.isPlainObject(data1[key]) && _.isPlainObject(data2[key]);
  const isAdded = (key) => !_.has(data1, key) && _.has(data2, key);
  const isRemoved = (key) => _.has(data1, key) && !_.has(data2, key);
  const isChanged = (key) => !_.isEqual(data1[key], data2[key]);

  const ast = sortedKeys(data1, data2).map((key) => {
    if (isObject(key)) {
      return { key, type: 'object', children: buildNode(data1[key], data2[key]) };
    }

    if (isAdded(key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (isRemoved(key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (isChanged(key)) {
      return {
        key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }

    return { key, type: 'unchanged', value: data2[key] };
  });

  return ast;
};

const buildAst = (data1, data2) => ({
  type: 'root',
  children: buildNode(data1, data2),
});

export default buildAst;
