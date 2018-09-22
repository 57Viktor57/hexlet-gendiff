import _ from 'lodash';

const hasKeys = (before, after, item) => _.has(before, item) && _.has(after, item);
const isEqual = (beforeItem, afterItem) => beforeItem === afterItem;


const getAst = (before, after, depth = 0) => {
  const keys = _.union(Object.keys(before), Object.keys(after));

  return keys.reduce((acc, item) => {
    const beforeItem = before[item];
    const afterItem = after[item];

    if (hasKeys(before, after, item)) {
      const testBefore = _.isObject(beforeItem);
      const testAfter = _.isObject(afterItem);
      if (testBefore && testAfter) {
        return [...acc, {
          type: 'object',
          key: item,
          children: getAst(beforeItem, afterItem, depth + 1),
          level: depth,
        }];
      } if (testBefore || testAfter) {
        return [...acc, {
          type: 'changed',
          key: item,
          beforeValue: beforeItem,
          afterValue: afterItem,
          level: depth,
        }];
      }
      if (isEqual(beforeItem, afterItem)) {
        return [...acc, {
          type: 'equal',
          key: item,
          beforeValue: beforeItem,
          level: depth,
        }];
      }
      return [...acc, {
        type: 'changed',
        key: item,
        beforeValue: beforeItem,
        afterValue: afterItem,
        level: depth,
      }];
      // else
    }
    if (_.has(before, item)) {
      return [...acc, {
        type: 'deleted',
        key: item,
        beforeValue: beforeItem,
        level: depth,
      }];
    }
    return [...acc, {
      type: 'added',
      key: item,
      afterValue: afterItem,
      level: depth,
    }];
    // else
  }, []); // reduce
};

export default getAst;
