import _ from 'lodash';

const strignify = (data) => {
  if (!_.isObject(data)) {
    return `'${data}'`;
  }
  return '[complex value]';
};

const render = (item, parent = '') => {
  const {
    type, key, beforeValue, afterValue, children,
  } = item;
  switch (type) {
    case 'object':
      return children.map(node => render(node, `${key}.`));
    case 'changed':
      return `Property '${parent}${key}' was updated. From ${strignify(beforeValue)} to ${strignify(afterValue)}`;
    case 'deleted':
      return `Property '${parent}${key}' was removed`;
    case 'added':
      return `Property '${parent}${key}' was added with value: ${strignify(afterValue)}`;
    default:
      return null;
  } // switch
};

export default tree => _.flattenDeep(tree.map(item => render(item))).filter(item => item !== null).join('\n');
