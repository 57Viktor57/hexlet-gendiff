import genDiff from '..'
import fs from 'fs';

const path = '__tests__/__fixtures__/';

describe('It works', () => {
  it('json', () => {
    const before = `${path}file1.json`;
    const after = `${path}file2.json`;
    expect(genDiff(before, after)).toEqual(fs.readFileSync(__dirname + `/__fixtures__/expect.txt`, 'utf-8').trim());
  });
});
