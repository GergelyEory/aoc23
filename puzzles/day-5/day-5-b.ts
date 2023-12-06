import { numRegex, readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);

  const batches: string[][] = [];
  let ind = 0;
  data.forEach((line) => {
    if (line.length === 0) {
      ind++;
    } else {
      if (!batches[ind]) {
        batches[ind] = [line];
      } else {
        batches[ind].push(line);
      }
    }
  });

  const seeds = batches[0][0]
    .split(' ')
    .slice(1)
    .map(Number)
    .flatMap((_, i, a) => (i % 2 ? [] : [a.slice(i, i + 2)]));

  const maps = batches
    .slice(1)
    .map((l) => l.slice(1).map((el) => el.match(numRegex).map(Number)))
    .toReversed();

  const locations = [82, 43, 86, 35];

  let location = 1;
  let res = 0;

  while (res === 0) {
    let asd = location;
    maps.forEach((map) => {
      asd = mapNumberReverse(asd, map);
    });

    if (validSeed(asd, seeds)) {
      res = location;
    }

    location++;
  }

  return res;
}

function validSeed(num: number, seeds: number[][]) {
  return seeds.some((seed) => num >= seed[0] && num < seed[0] + seed[1]);
}

function mapNumberReverse(num: number, map: number[][]) {
  for (let i = 0; i < map.length; i++) {
    const m = map[i];
    if (m[0] <= num && num < m[0] + m[2]) {
      return num - m[0] + m[1];
    }
  }
  return num;
}

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
