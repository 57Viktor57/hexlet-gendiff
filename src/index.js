import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const before = JSON.parse(fs.readFileSync(`${path.resolve('.')}/${path1.toString().trim()}`, 'utf8'));
  const after = JSON.parse(fs.readFileSync(`${path.resolve('.')}/${path2.toString().trim()}`, 'utf8'));

  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  const keys = _.union(beforeKeys, afterKeys);
  const ast = keys.reduce((acc, item) => {
    if ((_.has(before, item) && _.has(after, item)) && before[item] === after[item]) {
      return acc.concat({
        type: 'equal',
        key: item,
        beforeValue: before[item],
        afterValue: after[item],
      });
    } // if
    if ((_.has(before, item) && _.has(after, item)) && before[item] !== after[item]) {
      return acc.concat({
        type: 'changed',
        key: item,
        beforeValue: before[item],
        afterValue: after[item],
      });
    } // if
    if (_.has(before, item) && !_.has(after, item)) {
      return acc.concat({
        type: 'del',
        key: item,
        beforeValue: before[item],
        afterValue: null,
      });
    } // if
    if (!_.has(before, item) && _.has(after, item)) {
      return acc.concat({
        type: 'add',
        key: item,
        beforeValue: null,
        afterValue: after[item],
      });
    } // if
    return acc;
  }, []); // reduce

  const result = ast.reduce((acc, item) => {
    if (item.type === 'equal') {
      acc.push(`${item.key}: ${item.beforeValue}`);
      return acc;
    } // if
    if (item.type === 'changed') {
      acc.push(`- ${item.key}: ${item.beforeValue}`);
      acc.push(`+ ${item.key}: ${item.afterValue}`);
      return acc;
    } // if
    if (item.type === 'del') {
      acc.push(`- ${item.key}: ${item.beforeValue}`);
      return acc;
    } // if
    if (item.type === 'add') {
      acc.push(`+ ${item.key}: ${item.afterValue}`);
    } // if
    return acc;
  }, []); // reduce
  console.log(`{\n${result.join('\n')}\n}`);
  return `{\n${result.join('\n')}\n}`;
}; // function genDiff

export default genDiff;
