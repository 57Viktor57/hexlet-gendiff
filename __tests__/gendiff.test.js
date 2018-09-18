import genDiff from '..';
import fs from 'fs';

const path = '__tests__/__fixtures__/';

describe('It works', () => {
  it('json', () => {
    const before = `${path}file1.json`;
    const after = `${path}file2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expect.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
});
