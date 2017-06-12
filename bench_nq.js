
var nanoq = require('./nanoq.js');
var N = 10000000;

var data = [];

// Load consistent test data
// data = JSON.parse(require('fs').readFileSync("./random.json", "utf8"));

for (var t=0; t<N; t++)
  data.push((Math.random() * 1000)>>0);

var nq = new nanoq(0, compare);
//
// nq.push(0.1);
// nq.push(2.3);
// nq.push(3.3333);
// console.log(nq.pop(),nq.pop(),nq.pop());

function compare(a, b) {
    return a < b;
}

console.time('nanoq ['+N+' items]');
for (i = 0; i < N; i++) nq.push(data[i]);
for (i = 0; i < N; i++) nq.pop();
console.timeEnd('nanoq ['+N+' items]');
