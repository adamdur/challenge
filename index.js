const cfg = require('./config');
const helpers = require('./helpers');


let arr1 = helpers.randomArray(cfg.ARR_LENGTH, cfg.ARR_MIN, cfg.ARR_MAX)
let arr2 = helpers.randomArray(cfg.ARR_LENGTH, cfg.ARR_MIN, cfg.ARR_MAX)

console.time('exec_time');
console.log('========================')
console.log('INPUT DATA')
console.log('========================')
console.log(`ARRAY_1 = [${arr1.join(', ')}]`)
console.log(`ARRAY_2 = [${arr2.join(', ')}]`)
console.log('========================')

let result = helpers.solveChallenge(arr1, arr2)

console.log('========================')
console.log(`Result is: ${result}`)
console.log('========================')
console.timeEnd('exec_time');
