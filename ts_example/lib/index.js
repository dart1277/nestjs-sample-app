"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMode = exports.math1 = exports.fa12 = void 0;
let message = 'Hello world';
message += ' ok';
console.log(message);
let rx = new RegExp('a+b');
let arr = [1, 2, 3];
let se = new Set([1, 2, 3, 3]);
const arr2 = 'sdf sdf'.match(/sd(f)/g);
const arr3 = /s((d)f)/g.exec('sdf sdf');
console.log(arr3 === null || arr3 === void 0 ? void 0 : arr3.slice(0, 3));
let arr4 = [12, 3, 4];
let tpl = [0, '3'];
let ctr = {
    x: '12323',
    y: 1,
};
// object has property check - can be used for type inference
if ('x' in ctr) {
    console.log(ctr.x);
}
const casef = (li) => {
    switch (li) {
        case 'a':
            break;
        case 'b':
            break;
        case 'c':
            break;
        default:
            throw Error();
    }
};
casef('a');
const fa12 = (v) => {
    if (v.kind === 'a1') {
    }
    else if (v.kind === 'a2') {
    }
    else
        throw Error('none');
};
exports.fa12 = fa12;
class HttpErr extends Error {
    constructor() {
        super();
    }
}
// varagrs
function sum(...values) { }
// structural typing
// additional fields are ok, and can be sliced down
class Animal {
    //private name: string;
    constructor(name) {
        this.name = name;
    }
}
class Queue {
    //constructor(...args: T[]);
    //constructor(args: T[]);
    constructor(args) {
        this.queue = !!args ? [...args] : [];
    }
    push(item) {
        this.queue.push(item);
        return this;
    }
    pop() {
        return this.queue.shift() || null;
    }
    size() {
        return this.queue.length;
    }
    *[Symbol.iterator]() {
        let i = 0;
        while (i < this.queue.length) {
            yield this.queue[i];
            ++i;
        }
    }
}
const q = new Queue();
q.push(1).push(5).push(6);
for (const item of q) {
    console.log(item);
}
class Animals {
    get order() {
        return this._order;
    }
    constructor(order) {
        this._order = order;
    }
    compareTo(b) {
        console.log('Animal-', this, b);
        return this.order - b.order;
    }
}
class Dog extends Animals {
    constructor(order) {
        super(order);
    }
    compareTo(b) {
        console.log('Dog-', this, b);
        return this.order - b.order;
    }
}
let animals = new Animals(1);
let dog = new Dog(2);
console.log(dog.compareTo(animals));
console.log(animals.compareTo(dog));
let xxx = '123';
if (typeof xxx === 'string') {
    let yyy = xxx;
    console.log('To string ', yyy);
}
let zzz = xxx; // no type casting happens !!!
console.log('To string ', zzz);
// requires node specific definitions from *.d.ts files
console.log(process.env.VAR1);
const fz1 = (z) => { };
const p3d = { x: 1, y: 2 };
fz1(p3d.z);
const req1 = { json: '{}', body: '' };
// never can be used as assertion
function isA1(v) {
    // note special type hint syntax
    return v.kind === 'a1' && 'kind' in v; // kind in v is always true
}
const neverAssertionFun = (v) => {
    if (isA1(v)) {
        return v.kind;
    }
    if (v.kind === 'a2') {
        return v.kind;
    }
    const _assertNever = v;
    return _assertNever;
};
// typescript assertion functions
function assert(condition, message) {
    if (!condition)
        throw new Error(message);
}
function assertDate(value) {
    if (!(value instanceof Date))
        throw new Error(message);
}
function foverload(a, b, c) {
    if (b == null && c == null) {
    }
    else {
    }
}
const fun1Type = (v, x) => {
    // overload implementation
    return '';
};
const Point1 = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};
// abstract classes work similar to java
// readonly arrays and tuples
function reverseArray(input) {
    return input.slice().sort().reverse();
}
// force cast
const person33 = animals;
// as const type assertion
// converts all members to readonly and all arrays to readonly tuples
// as const can be also used to cast strings to literal type values
const ccc = {
    a: 1,
    b: [1, 2, 3],
};
// ccc.b.unshift(1); // won't work since as const was used
// this "guards", asserts thath object has "value field"
function double() {
    return (this.value = 2 * this.value);
}
function fullN(obj) {
    return Object.assign(Object.assign({}, obj), { fullN: `${obj.fn} ${obj.ln}` });
}
const fullN1 = fullN({ fn: 'a', ln: 'b' });
console.log(fullN1);
// in typescript typeof can be used on instances
const ce1 = {
    a: 0,
    b: 0,
};
const ce2 = {
    a: 1,
    b: 2,
};
// lookup types, allow to get type of a field of some object
const ce4 = 5;
// keyof type operator returns union of stings of key object types, T[Key] is just a lookup constraint
const funByKey = (v, k) => {
    return v[k];
};
console.log(funByKey(ce2, 'b'));
// bigint literals have n suffix ex. 24n
// null* return 'object' in plain javascript
// infer typename at runtime
function numberType(t) {
    return typeof t;
}
// Partial<T> makes fields optional, is provided by typescript compiler
// template literals
const lit1 = 'Some 234'; // useful in jsx, supports user defined types
const pad1 = 'small';
exports.math1 = {
    double() {
        // then double does not have to have signature like double(this: { value: number})
        return this.value * 2;
    },
};
const obj1math = Object.assign({ value: 5 }, exports.math1);
console.log(obj1math.double());
// Awaited<> utility // unwraps nested promise types
// there are string manipulation utilities like Uppercase<'aaaa'>
// typescript has builtin enums, although they are  considered anti-pattern (string enums are a bit better)
// 'enums' emulation in typescript, that allow to iterate over values
exports.LoginMode = {
    device: 'device',
    email: 'email',
};
