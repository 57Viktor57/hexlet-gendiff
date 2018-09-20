import _ from 'lodash';

const equalKeys = (before, after, item) => _.has(before, item) && _.has(after, item);
const objectsCompare = (beforeItem, afterItem) => {
  const before = _.isObject(beforeItem);
  const after = _.isObject(afterItem);
  if (before && after) {
    return 'bothObjects';
  } if (before || after) {
    return 'onlyOneObjects';
  }
  return 'noObjects';
};
const compareItems = (beforeItem, afterItem) => beforeItem === afterItem;


const getAst = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));

  return keys.reduce((acc, item) => {
    const beforeItem = before[item];
    const afterItem = after[item];

    if (equalKeys(before, after, item)) {
      const compare = objectsCompare(beforeItem, afterItem);
      switch (compare) {
        case 'bothObjects':
          return [...acc, {
            type: 'object',
            key: item,
            children: getAst(beforeItem, afterItem),
          }];
        case 'onlyOneObjects':
          return [...acc, {
            type: 'changed',
            key: item,
            beforeValue: beforeItem,
            afterValue: afterItem,
          }];
        case 'noObjects':
          if (compareItems(beforeItem, afterItem)) {
            return [...acc, {
              type: 'equal',
              key: item,
              beforeValue: beforeItem,
              afterValue: null,
            }];
          }
          return [...acc, {
            type: 'changed',
            key: item,
            beforeValue: beforeItem,
            afterValue: afterItem,
          }];

        default:
          throw new Error('Type error');
      } // switch
    } else {
      if (_.has(before, item)) {
        return [...acc, {
          type: 'del',
          key: item,
          beforeValue: beforeItem,
          afterValue: null,
        }];
      }
      return [...acc, {
        type: 'add',
        key: item,
        beforeValue: null,
        afterValue: afterItem,
      }];
    }
  }, []);
};

export default getAst;
