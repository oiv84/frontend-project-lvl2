import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const outputFormats = ['stylish', 'plain'];

const filesExtensions = [
  ['json', 'json'],
  ['yml', 'yml'],
  ['yaml', 'yaml'],

  ['json', 'yml'],
  ['json', 'yaml'],

  ['yml', 'json'],
  ['yaml', 'json'],
];

describe('genDiff', () => {
  outputFormats.forEach((outputFormat) => {
    describe(`${outputFormat} format`, () => {
      filesExtensions.forEach(([fileExt1, fileExt2]) => {
        const result = readFile(`result_${outputFormat}.txt`);

        test(`Should return correct diff *.${fileExt1} *.${fileExt2} files`, () => {
          const filePath1 = getFixturePath(`file1.${fileExt1}`);
          const filePath2 = getFixturePath(`file2.${fileExt2}`);

          expect(genDiff(filePath1, filePath2, outputFormat)).toBe(result);
        });
      });
    });
  });
});
