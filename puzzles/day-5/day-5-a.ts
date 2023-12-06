import { readData } from '../../shared.ts';
import chalk from 'chalk';

const regex = /\d+/g;

export async function day5a(dataPath?: string) {
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
  const seeds = batches[0][0].split(' ').slice(1).map(Number);
  const maps = batches.slice(1).map((l) => l.slice(1).map((el) => el.match(regex).map(Number)));

  const res = seeds.map((seed, i) => {
    let asd = seed;
    maps.forEach(async (map, j) => {
      asd = mapNumber(asd, map);
    });
    return asd;
  });

  return Math.min(...res);
}

function mapNumber(num: number, map: number[][]) {
  for (let i = 0; i < map.length; i++) {
    const m = map[i];
    if (m[1] <= num && num < m[1] + m[2]) {
      return num - m[1] + m[0];
    }
  }
  return num;
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
