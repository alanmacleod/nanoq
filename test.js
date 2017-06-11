import test from 'ava';
var nanoq = require('./nanoq');

var data=[], w=100;

while(--w) data.push((100 * Math.random())>>0);

test('Typed Array 8bit', t => {
	let q = new nanoq(255);
	t.is(Object.prototype.toString.call(q.tree), '[object Uint8Array]');
});

test('Typed Array 16bit', t => {
	let q = new nanoq(256);
	t.is(Object.prototype.toString.call(q.tree), '[object Uint16Array]');
});

test('Typed Array 32bit', t => {
	let q = new nanoq(65536);
	t.is(Object.prototype.toString.call(q.tree), '[object Uint32Array]');
});

test('Js Array', t => {
	let q = new nanoq();
	t.is(Object.prototype.toString.call(q.tree), '[object Array]');
	t.pass();
});

test('Sorted default comparator', t => {
	let q = new nanoq(); // nanoq is a minheap by default

	for (let i=0; i<data.length; i++) q.push(data[i]);

	var last = -1;
	for (let i=0; i<data.length; i++)
	{
		let p = q.pop();
		t.true(p >= last);
		last = p;
	}

	t.pass();
});

test('Sorted minheap comparator', t => {
	let q = new nanoq(0, (a, b) => a - b);

	for (let i=0; i<data.length; i++) q.push(data[i]);

	var last = -1;
	for (let i=0; i<data.length; i++)
	{
		let p = q.pop();
		t.true(p >= last);
		last = p;
	}

	t.pass();
});


test('Sorted maxheap comparator', t => {
	let q = new nanoq(0, (a, b) => b - a);

	for (let i=0; i<data.length; i++) q.push(data[i]);

	var last = 101;
	for (let i=0; i<data.length; i++)
	{
		let p = q.pop();
		t.true(p <= last);
		last = p;
	}

	t.pass();
});

test('Test pop() underflow', t => {
	let q = new nanoq();
	q.push(1);
	q.push(2);
	q.push(3);

	q.pop();
	q.pop();
	q.pop();

	t.is(q.pop(), null);
});
