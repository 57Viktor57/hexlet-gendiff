import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';

describe('It works', () => {
  it('json', () => {
    const before = `${path}file1.json`;
    const after = `${path}file2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expect.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  it('yaml', () => {
    const before = `${path}file1.yaml`;
    const after = `${path}file2.yaml`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expect.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  it('ini', () => {
    const before = `${path}file1.ini`;
    const after = `${path}file2.ini`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expect.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  it('tree', () => {
    const before = `${path}tree1.json`;
    const after = `${path}tree2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expectTree.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
});
