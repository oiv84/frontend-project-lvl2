import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff JSON plain', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const result = readFile('result.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('genDiff YAML plain', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');

  const result = readFile('result.txt');

  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
