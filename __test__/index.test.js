import genDiff from '../src/index.js';

const filepath1 = '__fixtures__/file1.json';
const filepath2 = '__fixtures__/file2.json';

test('genDiff JSON plain', () => {
  expect(genDiff(filepath1, filepath2))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
