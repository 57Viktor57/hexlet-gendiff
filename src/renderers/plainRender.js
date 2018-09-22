import _ from 'lodash';

const strignify = (data) => {
  if (!_.isObject(data)) {
    return `'${data}'`;
  }
  return '[complex value]';
};

const render = (item, parent = '') => {
  const {
    type, key, beforeValue, afterValue, children, value,
  } = item;
  switch (type) {
    case 'object':
      return children.map(node => render(node, `${key}.`));
    case 'changed':
      return `Property '${parent}${key}' was updated. From ${strignify(beforeValue)} to ${strignify(afterValue)}`;
    case 'deleted':
      return `Property '${parent}${key}' was removed`;
    case 'added':
      return `Property '${parent}${key}' was added with value: ${strignify(value)}`;
    default:
      return null;
  } // switch
}; // function render

export default ast => _.flattenDeep(ast.map(item => render(item))).filter(item => item !== null).join('\n');
