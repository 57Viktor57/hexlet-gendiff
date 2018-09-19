import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getAst from './getAst';
import render from './render';
import getParseObject from './parsers';

const genDiff = (path1, path2) => {
  const beforeData = fs.readFileSync(`${path1.toString().trim()}`, 'utf8');
  const afterData = fs.readFileSync(`${path2.toString().trim()}`, 'utf8');

  const beforeExtension = path.extname(path1);
  const afterExtension = path.extname(path2);

  const beforeObjectData = getParseObject(beforeData, beforeExtension);
  const afterObjectData = getParseObject(afterData, afterExtension);

  const beforeKeys = Object.keys(beforeObjectData);
  const afterKeys = Object.keys(afterObjectData);

  const uniqueKeys = _.union(beforeKeys, afterKeys);
  const ast = getAst(uniqueKeys, beforeObjectData, afterObjectData);

  return render(ast);
}; // function genDiff

export default genDiff;
