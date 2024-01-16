const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const currencies = new Map([
    ['USD' , 'United states dollar'],
    ['EUR' , 'Euro'],
    ['GBP' , 'Pound sterling'],
]);

/////////////////////////////////////////////////
/** forEach is higher order function, which accepts function
 * 'continue' and 'break' statements does not work with forEach loop
 */
movements.forEach((movement , index, arr)=>{
  console.log(`movment at index ${index} is ${movement}`)
})

/////////////////////////////////////////////////
console.log(`foreach with maps`)
/** for maps first arg is value and second is for key */
currencies.forEach((value , key , map)=>{
    console.log(`${key} -> ${value} -> ${map}`)
})

/////////////////////////////////////////////////
console.log(`foreach with sets `)
/** for set for each will have same value for key and value as set does not have index */

const set = new Set(['EUD', 'USD'])
set.add('EUD')

set.forEach((value , key , set)=>{
    console.log(`${key} ${value}`)
})