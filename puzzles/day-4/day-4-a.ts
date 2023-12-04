import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data = (await readData(dataPath)).filter((d) => d.trim().length);

  const regex = /\d+/g;

  const nums = data.map((line) =>
    line
      .split(':')[1]
      .split('|')
      .map((part) => part.trim().match(regex).map(Number)),
  );

  const values = nums.map((line) => {
    const pow = line[1].filter((v) => line[0].includes(v)).length - 1;
    return pow >= 0 ? Math.pow(2, pow) : 0;
  });

  return values.reduce((acc, curr) => acc + curr);
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
