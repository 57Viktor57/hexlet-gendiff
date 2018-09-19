import fs from 'fs';
import _ from 'lodash';
import getAst from './getAst';
import render from './render';

const genDiff = (path1, path2) => {
  const before = JSON.parse(fs.readFileSync(`${path1.toString().trim()}`, 'utf8'));
  const after = JSON.parse(fs.readFileSync(`${path2.toString().trim()}`, 'utf8'));

  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  const keys = _.union(beforeKeys, afterKeys);
  const ast = getAst(keys, before, after);
  return render(ast);
}; // function genDiff

export default genDiff;
