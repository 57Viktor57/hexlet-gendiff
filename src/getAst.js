import _ from 'lodash';

const getAst = (before, after, depth = 0) => {
  const keys = _.union(Object.keys(before), Object.keys(after));

  return keys.reduce((acc, item) => {
    const beforeItem = before[item];
    const afterItem = after[item];

    if (_.has(before, item) && _.has(after, item)) {
      const testBefore = _.isObject(beforeItem);
      const testAfter = _.isObject(afterItem);
      if (testBefore && testAfter) {
        return [...acc, {
          type: 'object',
          key: item,
          children: getAst(beforeItem, afterItem, depth + 1),
          level: depth,
        }];
      } // if_2
      if (testBefore || testAfter) {
        return [...acc, {
          type: 'changed',
          key: item,
          beforeValue: beforeItem,
          afterValue: afterItem,
          level: depth,
        }];
      } // if_2
      if (beforeItem === afterItem) {
        return [...acc, {
          type: 'unchanged',
          key: item,
          value: beforeItem,
          level: depth,
        }];
      } // if_2
      return [...acc, {
        type: 'changed',
        key: item,
        beforeValue: beforeItem,
        afterValue: afterItem,
        level: depth,
      }];
    } // if_1
    if (_.has(before, item)) {
      return [...acc, {
        type: 'deleted',
        key: item,
        value: beforeItem,
        level: depth,
      }];
    } // if
    return [...acc, {
      type: 'added',
      key: item,
      value: afterItem,
      level: depth,
    }];
  }, []); // reduce
}; // function getAst

export default getAst;
