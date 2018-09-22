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

const render = (item) => {
  const {
    type, key, beforeValue, afterValue, children, level,
  } = item;
  switch (type) {
    case 'object':
      return `${tab(level + 1)}${key}: {\n${children.map(node => render(node)).join('\n')}\n${tab(level + 1)}}`;
    case 'equal':
      return `${tab(level + 1)}${key}: ${strignify(beforeValue, level)}`;
    case 'changed':
      return `${tab(level)}- ${key}: ${strignify(beforeValue, level)}\n${tab(level)}+ ${key}: ${strignify(afterValue, level)}`;
    case 'deleted':
      return `${tab(level)}- ${key}: ${strignify(beforeValue, level)}`;
    case 'added':
      return `${tab(level)}+ ${key}: ${strignify(afterValue, level)}`;
    default:
      throw new Error('Type error');
  } // switch
};

export default tree => _.flattenDeep(['{', tree.map(item => render(item)), '}']).join('\n');
