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
  const before = strignify(beforeValue, level);
  const after = strignify(afterValue, level);
  switch (type) {
    case 'object':
      return [
        `${tab(level)}  ${key}: {`,
        children.map(node => render(node)),
        `${tab(level)}  }`,
      ];
    case 'equal':
      return [
        `${tab(level + 1)}${key}: ${before}`,
      ];
    case 'changed':
      return [
        `${tab(level)}- ${key}: ${before}`,
        `${tab(level)}+ ${key}: ${after}`,
      ];
    case 'deleted':
      return [
        `${tab(level)}- ${key}: ${before}`,
      ];
    case 'added':
      return [
        `${tab(level)}+ ${key}: ${after}`,
      ];
    default:
      throw new Error('Type error');
  } // switch
};

export default tree => `{\n${_.flattenDeep(tree.map(item => render(item))).join('\n')}\n}`;
