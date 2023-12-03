import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);

  const rounds = data.slice(0, data.length - 1).map((l) => l.split(':')[1].trim());
  const draws = rounds.map((r) => r.split(';').map((d) => d.trim()));
  const asd = draws.map((line) =>
    line.map((round) => round.split(',').map((draw) => draw.trim().split(' '))),
  );

  const nums = asd.map((a) =>
    a.map((draws) => {
      const ret = {};
      draws.forEach((draw) => {
        if (draw[1] === 'red') {
          ret['r'] = +draw[0];
          return;
        }
        if (draw[1] === 'green') {
          ret['g'] = +draw[0];
          return;
        }
        if (draw[1] === 'blue') {
          ret['b'] = +draw[0];
        }
      });
      return ret;
    }),
  );

  const maxes = nums.map((line) => {
    const max = { r: 0, g: 0, b: 0 };
    line.forEach((o) => {
      for (let key in o) {
        if (o[key] !== undefined && o[key] > max[key]) {
          max[key] = o[key];
        }
      }
    });
    return max;
  });

  const powers = maxes.map((o) => {
    let prod = 1;
    for (let key in o) {
      prod = prod * o[key];
    }
    return prod;
  });

  return powers.reduce((acc, curr) => (acc += curr), 0);
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
