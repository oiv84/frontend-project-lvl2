import _ from 'lodash';

const buildAst = (data1, data2) => {
  const keys = _.orderBy(_.union(Object.keys(data1), Object.keys(data2)));

  const ast = keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        status: 'hasChildren',
        value: buildAst(data1[key], data2[key]),
      };
    }

    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        key,
        status: 'added',
        value: data2[key],
      };
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        key,
        status: 'removed',
        value: data1[key],
      };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        status: 'changed',
        oldValue: data1[key],
        newValue: data2[key],
      };
    }

    return {
      key,
      status: 'unchanged',
      value: data1[key],
    };
  });

  return ast;
};

export default buildAst;
