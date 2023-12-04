import { readData } from '../../shared.ts';
import chalk from 'chalk';

export type partNumber = { value: number; places: number[][] };

export async function day3a(dataPath?: string) {
  const data = (await readData(dataPath)).filter((l) => l.length);
  const array = data.map((line) => line.split(''));

  const numRows = array.length;
  const numCols = array[0].length;

  const symbols = findSymbols(array);

  const numbers = findNumbers(array);

  const partNumbers: partNumber[] = numbers.filter((n) =>
    checkNumber(n, symbols, numRows, numCols),
  );

  return partNumbers.map((n) => n.value).reduce((curr, acc) => acc + curr, 0);
}

function findSymbols(array: string[][]) {
  const symbols: number[][] = [];
  array.forEach((line, i) => {
    line.forEach((col, j) => {
      const char = array[i][j];
      if (!Number.isInteger(+char) && char !== '.') {
        symbols.push([i, j]);
      }
    });
  });
  return symbols;
}

export function findNumbers(array: string[][]) {
  const numbers: partNumber[] = [];

  array.forEach((line, i) => {
    line.forEach((col, j) => {
      if (Number.isInteger(+array[i][j - 1])) {
        return;
      }

      if (Number.isInteger(+array[i][j])) {
        let acc = '';
        const places: number[][] = [];

        for (let k = j; k <= array[0].length; k++) {
          if (Number.isInteger(+array[i][k])) {
            const digit = array[i][k];
            acc += digit;
            places.push([i, k]);
          } else {
            numbers.push({ value: +acc, places });
            break;
          }
        }
      }
    });
  });

  return numbers;
}

function searchNearby(digit: number[], symbols: number[][], numRows: number, numCols: number) {
  for (let i = Math.max(0, digit[0] - 1); i <= Math.min(numRows - 1, digit[0] + 1); i++) {
    for (let j = Math.max(0, digit[1] - 1); j <= Math.min(numCols - 1, digit[1] + 1); j++) {
      if (symbols.some((sym) => sym[0] === i && sym[1] === j)) {
        return true;
      }
    }
  }

  return false;
}

function checkNumber(part: partNumber, symbols: number[][], numRows: number, numCols: number) {
  return part.places.some((digit) => searchNearby(digit, symbols, numRows, numCols));
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
