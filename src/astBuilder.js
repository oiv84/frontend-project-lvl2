import _ from 'lodash';

const buildNode = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const ast = sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'object',
        children: buildNode(data1[key], data2[key]),
      };
    }

    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'changed',
        oldValue: data1[key],
        newValue: data2[key],
      };
    }

    return {
      key,
      type: 'unchanged',
      value: data2[key],
    };
  });

  return ast;
};

const buildAst = (data1, data2) => ({
  type: 'root',
  children: buildNode(data1, data2),
});

export default buildAst;
