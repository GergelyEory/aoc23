import {readData} from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);

  const inArray = data.slice(0, data.length-1).map((line) =>
    line
      .split('')
      .filter((char) => Number.isInteger(+char))
      .join(),
  );

  const sums = inArray.map((line) => Number.parseInt(`${line[0]}${line[line.length - 1]}`));

  return sums.reduce((inp, acc) => acc + inp, 0);
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
