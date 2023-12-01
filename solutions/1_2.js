import { input } from '../inputs/1_input.js';

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

const inArray = input.split('\n').map((line) => line.trim());
const numbers = inArray.map((line) => {
  const acc = [];
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

const sums = numbers.map((line) => Number.parseInt(`${line[0]}${line[line.length - 1]}`));

const res = sums.reduce((inp, acc) => acc + inp, 0);
console.log(res);
