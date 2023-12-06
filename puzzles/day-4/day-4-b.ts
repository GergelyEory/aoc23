import { numRegex, readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = (await readData(dataPath)).filter((d) => d.trim().length);

  const nums = data.map((line) =>
    line
      .split(':')[1]
      .split('|')
      .map((part) => part.trim().match(numRegex).map(Number)),
  );

  const values = nums.map((line) => line[1].filter((v) => line[0].includes(v)).length);
  const copies: number[] = new Array(values.length).fill(1);

  for (let card = 0; card < values.length; card++) {
    for (let val = 1; val <= values[card]; val++) {
      copies[card + val] += copies[card];
    }
  }

  return copies.reduce((acc, curr) => acc + curr);
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
