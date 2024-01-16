const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(`original array`, movements);
// console.log(`////////////// map method`);
// const d_movements = movements.map(e => {
//   return e * 2;
// });
// console.log(`movements of map method`, d_movements);
// const map = movements.map((e, i, arr) => {
//   console.log(e, i, arr);
// });

// /** first param is single element, second is index and 3rd is array itself
//  * Note** break and continue statement is not going to work in filter function
//  */
// console.log(`//////////// filter method`);
// const positive_movements = movements.filter((e, i, arr) => {
//   console.log(e, i, arr);
//   return e > 0;
// });
// console.log(positive_movements);

// console.log(`//////////// reduce method`);
// // global balance of the account
// /**
//  * first param is accumulator
//  * second param is current element
//  * third param is index
//  * fourth param is array itself
//  */
// const accountTotal = movements.reduce((acc, curr, i, arr) => {
//   console.log(acc, curr, i, arr);
//   return (acc += curr);
// }, 0);

// console.log(accountTotal);

// console.log('////////////////////////// method chaining');

// const euroToUSD = 1.1;
// const balanceinDollars = movements
//   .filter(mov => {
//     return mov > 0;
//   })
//   .map((mov, _, arr) => {
//     return mov * euroToUSD;
//   })
//   .reduce((acc, mov) => {
//     return (acc += mov);
//   }, 0);

// console.log(balanceinDollars);

// console.log('////////////////////////// find method');
/** loops over array to find first element with condition and return element but not array */

const firstWithDrawal = movements.find(movmenet => movmenet < 0);
console.log(firstWithDrawal);

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

console.log(`////////////////////// some method`);
/** returns true if there are values matching condition */
console.log(movements.some(mov => mov > 0));

console.log(movements.some(mov => mov > 0));

console.log(`////////////////////// flat method`);
/** removes nested array and returns a flat array */
const arr = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(arr.flat());

const deep = [
  [1, [2, 3]],
  [1, 2, 3],
];

console.log(deep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);

const acc = function (acc, element) {
  return (acc += element);
};

console.log(
  accounts
    .map(acc => acc.movements)
    .flat()
    .reduce(acc, 0)
);
/** combination of flat and map is FlatMap */
console.log(accounts.flatMap(acc => acc.movements).reduce(acc, 0));

/** Sorting Arrays
 *
 * does sorting based on strings
 *
 */

const owners = accounts.map(account => account.owner.split(' ')[0]);

console.log(`before sorting`);
console.log(owners);
console.log(`after sorting`);
console.log(owners.sort()); // mutates original array

console.log(
  `wrong output , as sorting is done on basis of strings`,
  movements.sort()
);

/** correct verison */

const sorted_movements = movements.sort((a, b) => {
  // return < 0 A,B
  // return > 0 B,A
  if (a > b) {
    return 1;
  } else {
    return -1;
  }
});

console.log(sorted_movements);

const sorted_movements_m2 = movements.sort((a, b) => a - b);
console.log(sorted_movements_m2);
