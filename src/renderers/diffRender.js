import _ from 'lodash';

const tab = num => ' '.repeat(num * 2);

const strignify = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const inner = keys.map((item) => {
    if (!_.isObject(item)) {
      return `${tab(level + 2)}${item}: ${data[item]}`;
    }
    return `${tab(level + 2)}${item}: ${strignify(item, level)}`;
  });
  return _.flattenDeep(['{', inner, `${tab(level)}  }`]).join('\n');
};

const render = (item, depth = 0) => {
  const {
    type, key, beforeValue, afterValue, children, value,
  } = item;
  switch (type) {
    case 'object':
      return [`${tab(depth + 1)}${key}: {`,
        ...children.map(node => render(node, depth + 1)),
        `${tab(depth + 1)}}`];
    case 'unchanged':
      return `${tab(depth + 1)}${key}: ${strignify(value, depth)}`;
    case 'changed':
      return [`${tab(depth)}- ${key}: ${strignify(beforeValue, depth)}`,
        `${tab(depth)}+ ${key}: ${strignify(afterValue, depth)}`];
    case 'deleted':
      return `${tab(depth)}- ${key}: ${strignify(value, depth)}`;
    case 'added':
      return `${tab(depth)}+ ${key}: ${strignify(value, depth)}`;
    default:
      throw new Error('Type error');
  } // switch
}; // function render

export default ast => _.flattenDeep(['{', ast.map(item => render(item)), '}']).join('\n');
