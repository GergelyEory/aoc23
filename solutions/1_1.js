import { input } from '../inputs/1_input.js';

const inArray = input.split('\n').map((line) =>
  line
    .trim()
    .split('')
    .filter((char) => Number.isInteger(+char))
    .join(),
);
const sums = inArray.map((line) => Number.parseInt(`${line[0]}${line[line.length - 1]}`));

const res = sums.reduce((inp, acc) => acc + inp, 0);
console.log(res);
