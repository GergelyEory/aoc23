import { input } from '../inputs/2_input.js';

const lines = input.split('\n');
const rounds = lines.map((l) => l.split(':')[1].trim());
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

console.log(maxes);

const foo = maxes.reduce(
  (acc, curr, i) =>
    (!curr['r'] || curr['r'] <= 12) &&
    (!curr['g'] || curr['g'] <= 13) &&
    (!curr['b'] || curr['b'] <= 14)
      ? acc + i + 1
      : acc,
  0,
);

console.log(foo);
