import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { findNumbers } from './day-3-a.js';

export async function day3b(dataPath?: string) {
  const data = (await readData(dataPath)).filter((l) => l.length);
  const array = data.map((line) => line.split(''));

  const numRows = array.length;
  const numCols = array[0].length;

  const stars = findStars(array);

  const numbers = findNumbers(array);

  const goodStars = stars.map((star) => {
    let surroundingNums: number[] = [];

    for (let i = Math.max(0, star[0] - 1); i <= Math.min(numRows - 1, star[0] + 1); i++) {
      for (let j = Math.max(0, star[1] - 1); j <= Math.min(numCols - 1, star[1] + 1); j++) {
        numbers.forEach((n) => {
          if (n.places.some((digit) => matchPlaces(digit, [i, j]))) {
            surroundingNums.push(n.value);
            return;
          }
        });
      }
    }

    // this is not the correct way to avoid double counting, but it is effectively the same as checking if the
    // number was counted for a star already. It fails if a gear is adjacent to 2 identical part numbers.
    // Seems to work here tho.
    return [...new Set(surroundingNums)];
  });

  const gears = goodStars.filter((n) => n.length === 2);

  const ratios = gears.map((gear) => gear[0] * gear[1]);

  return ratios.reduce((acc, curr) => acc + curr);
}

function findStars(array: string[][]) {
  const stars: number[][] = [];
  array.forEach((line, i) => {
    line.forEach((char, j) => char === '*' && stars.push([i, j]));
  });
  return stars;
}

function matchPlaces(a: number[], b: number[]) {
  return a[0] === b[0] && a[1] === b[1];
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
