import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filesExtensions = ['json', 'yml', 'yaml'];

const resultStylish = fs.readFileSync(getFixturePath('result_stylish.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('result_plain.txt'), 'utf-8');
const resultJson = fs.readFileSync(getFixturePath('result_json.txt'), 'utf-8');

describe('Should return correct diff for', () => {
  test.each(filesExtensions)('%p files', (extension) => {
    const file1 = getFixturePath(`file1.${extension}`);
    const file2 = getFixturePath(`file2.${extension}`);

    expect(genDiff(file1, file2, 'stylish')).toEqual(resultStylish.toString());
    expect(genDiff(file1, file2, 'plain')).toEqual(resultPlain.toString());
    expect(genDiff(file1, file2, 'json')).toEqual(resultJson.toString());
  });
});
