import _ from 'lodash';

export default (keys, before, after) => keys.reduce((acc, item) => {
  if ((_.has(before, item) && _.has(after, item)) && before[item] === after[item]) {
    return [...acc, {
      type: 'equal',
      key: item,
      beforeValue: before[item],
      afterValue: after[item],
    }];
  } // if
  if ((_.has(before, item) && _.has(after, item)) && before[item] !== after[item]) {
    return [...acc, {
      type: 'changed',
      key: item,
      beforeValue: before[item],
      afterValue: after[item],
    }];
  } // if
  if (_.has(before, item) && !_.has(after, item)) {
    return [...acc, {
      type: 'del',
      key: item,
      beforeValue: before[item],
      afterValue: null,
    }];
  } // if
  if (!_.has(before, item) && _.has(after, item)) {
    return [...acc, {
      type: 'add',
      key: item,
      beforeValue: null,
      afterValue: after[item],
    }];
  } // if
  return acc;
}, []);
