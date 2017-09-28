
[![Build Status](https://travis-ci.org/alanmacleod/nanoq.svg?branch=master)](https://travis-ci.org/alanmacleod/nanoq)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# nanoq

The world's fastest Javascript priority queue? Maybe?

Itsy bitsy teeny weeny priority queue implemented as a blazing fast binary heap in fewer than 30 lines of code (sort of .. ok there's a couple of lines with two statements).

Supports arbitrary objects including strings or, by passing a maximum tree size, will select the best `TypedArray` for guaranteed compact memory usage (...won't somebody think of the mobiles T_T)

## Benchmarks

_ran under Node v6.9.1_

package | num items (push/pop)| time (seconds)
--- | --- | ---
**nanoq (v0.0.3)** | 10,000,000 | **1.855** 🔥
[tinyQueue (v1.2.2)](https://github.com/mourner/tinyqueue) | 10,000,000 | 2.714
[FastPriorityQueue (0.2.4)](https://github.com/lemire/FastPriorityQueue.js) | 10,000,000 | 12.008

## Usage
nanoq has four methods; `push()`, `pop()`, `peek()` and `length()`, all fairly self-explanatory oui?

Install via npm:

```
$ npm install nanoq
```

```js
var nanoq = require('nanoq');

// nanoq is a "minheap" by default
var q = new nanoq();

q.push(30);
q.push(20);
q.push(10);

console.log(q.length()) // returns 3. length() is a method not a property
console.log(q.pop(), q.pop(), q.pop()); // returns 10, 20, 30

// Works with strings:
q = new nanoq();

q.push("dog");
q.push("pig");
q.push("cat");

// peek() returns the topmost item without pop()ing
console.log(q.peek()) // returns "cat"

// force a TypedArray by passing in a maximum number of heap items
q = new nanoq(255);
// Note: .push() accepts integers only in this mode

// use your own comparator, here is a maxheap
// (pass 0 or null for the 1st param if you want to use regular JS arrays)
q = new nanoq(null, function(a,b) {
  return a < b;
});

// add items to the maxheap
q.push(1);
q.push(2);
q.push(3);

console.log(q.pop(), q.pop(), q.pop()); // returns 3, 2, 1

// use your own custom objects
var stuff = [
    {val: 3},
    {val: 2},
    {val: 1},
];

q = new nanoq(null, function(a, b){
  return a.val > b.val
});

for (var s of stuff)
  q.push(s);

console.log(q.pop(), q.pop(), q.pop()); // returns {val:1}, {val:2}, {val:3}
```
