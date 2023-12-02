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
