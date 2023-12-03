import { readData } from '../../shared.ts';
import chalk from 'chalk';

const table = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);

  const numbers = parseNumbers(data.slice(0, data.length - 1))

  const sums = numbers.map((line) => Number.parseInt(`${line[0]}${line[line.length - 1]}`));

  return sums.reduce((inp, acc) => acc + inp, 0);
}

function parseNumbers(inArray: string[]) {
  return inArray.map((line) => {
    const acc: number[] = [];
    const chars = line.split('');
    chars.forEach((char, i) => {
      if (Number.isInteger(+char)) {
        acc.push(+char);
        return;
      }

      const sub3 = line.slice(i, i + 3);
      const sub4 = line.slice(i, i + 4);
      const sub5 = line.slice(i, i + 5);

      for (let key in table) {
        if (sub3 === key) {
          acc.push(table[key]);
          return;
        }
        if (sub4 === key) {
          acc.push(table[key]);
          return;
        }
        if (sub5 === key) {
          acc.push(table[key]);
          return;
        }
      }
    });
    return acc;
  });
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
