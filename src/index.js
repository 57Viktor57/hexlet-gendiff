import fs from 'fs';
import path from 'path';
import getAst from './getAst';
import render from './renderers';
import getParsedObject from './parsers';

const genDiff = (path1, path2, type = 'diff') => {
  const beforeData = fs.readFileSync(`${path1.toString().trim()}`, 'utf8');
  const afterData = fs.readFileSync(`${path2.toString().trim()}`, 'utf8');

  const beforeExtension = path.extname(path1);
  const afterExtension = path.extname(path2);

  const beforeObjectData = getParsedObject(beforeData, beforeExtension);
  const afterObjectData = getParsedObject(afterData, afterExtension);

  const ast = getAst(beforeObjectData, afterObjectData);
  return render(ast, type);
}; // function genDiff

export default genDiff;
