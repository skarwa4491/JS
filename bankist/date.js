/** creating dates */

// method-1
let now = new Date();
console.log(now);

now = new Date('Sun Aug 02 2020 18:05:41');
console.log(now);

now = new Date('December 24, 2015');
console.log(now);

now = new Date('2019-11-18T21:31:17.178Z');
console.log(now);

/** Method 2 */
let future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDay()); // day of week
console.log(future.toISOString());
