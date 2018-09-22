import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';

describe('It works', () => {
  it('json', () => {
    const before = `${path}file1.json`;
    const after = `${path}file2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  it('yaml', () => {
    const before = `${path}file1.yaml`;
    const after = `${path}file2.yaml`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  it('ini', () => {
    const before = `${path}file1.ini`;
    const after = `${path}file2.ini`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  it('tree', () => {
    const before = `${path}tree1.json`;
    const after = `${path}tree2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expectedTree.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  it('plain', () => {
    const before = `${path}tree1.json`;
    const after = `${path}tree2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expectedPlain.txt`, 'utf-8').trim();
    expect(genDiff(before, after, 'plain')).toEqual(content);
  });
  it('jsonOutput', () => {
    const before = `${path}tree1.json`;
    const after = `${path}tree2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expectedJson.txt`, 'utf-8').trim();
    expect(genDiff(before, after, 'json')).toEqual(content);
  });
});
