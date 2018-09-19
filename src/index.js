import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getAst from './getAst';
import render from './render';
import adapter from './adapter';

const genDiff = (path1, path2) => {
  const beforeData = fs.readFileSync(`${path1.toString().trim()}`, 'utf8');
  const afterData = fs.readFileSync(`${path2.toString().trim()}`, 'utf8');

  const beforeExtension = path.extname(path1);
  const afterExtension = path.extname(path2);

  const before = adapter(beforeData, beforeExtension);
  const after = adapter(afterData, afterExtension);

  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  const keys = _.union(beforeKeys, afterKeys);
  const ast = getAst(keys, before, after);

  return render(ast);
}; // function genDiff

export default genDiff;
