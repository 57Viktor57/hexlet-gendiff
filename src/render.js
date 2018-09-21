import _ from 'lodash';

const renderObject = (data, depth) => {
  if (_.isObject(data)) {
    const keys = Object.keys(data);
    return ['{', ...keys.reduce((acc, item) => {
      if (_.isObject(data[item])) {
        return [...acc, `${' '.repeat(depth * 2)}${item}: ${renderObject(data[item], depth + 1)}`];
      }
      return [...acc, `${' '.repeat(depth * 2)}${item}: ${data[item]}`];
    }, []), `${' '.repeat(depth * 2 - 2)}}`].join('\n');
  }
  return data;
};

const render = (ast, depth = 1) => ['{', ...ast.reduce((acc, item) => {
  const {
    type, key, beforeValue, afterValue, children,
  } = item;
  const before = renderObject(beforeValue, depth + 1);
  const after = renderObject(afterValue, depth + 1);
  switch (type) {
    case 'object':
      return [
        ...acc, `${' '.repeat(depth * 2)}${key}: ${render(children, depth + 1)}`,
      ];
    case 'equal':
      return [
        ...acc, `${' '.repeat(depth * 2)}${key}: ${before}`,
      ];
    case 'changed':
      return [
        ...acc, `${' '.repeat(depth * 2 - 2)}- ${key}: ${before}`,
        `${' '.repeat(depth * 2 - 2)}+ ${key}: ${after}`,
      ];
    case 'del':
      return [
        ...acc, `${' '.repeat(depth * 2 - 2)}- ${key}: ${before}`,
      ];
    case 'add':
      return [
        ...acc, `${' '.repeat(depth * 2 - 2)}+ ${key}: ${after}`,
      ];
    default:
      throw new Error('Type error');
  } // switch
}, []), `${' '.repeat(depth * 2 - 2)}}`].join('\n');

export default render;
