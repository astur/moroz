const test = require('ava');
const deepFreeze = require('.');

test('Base', t => {
    const o = {};
    deepFreeze(o);
    t.true(Object.isFrozen(o));
});

test('primitives', t => {
    const o = {
        b: true,
        n: 1,
        t: 'test',
        u: undefined,
        s: Symbol('test'),
        r: /^.*$/i,
    };
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
    t.true(Object.isFrozen(o.b));
    t.true(Object.isFrozen(o.n));
    t.true(Object.isFrozen(o.t));
    t.true(Object.isFrozen(o.u));
    t.true(Object.isFrozen(o.s));
    t.true(Object.isFrozen(o.r));
});

test('null', t => {
    const o = {n: null};
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
    t.true(Object.isFrozen(o.n));
});

test('nested object&arrays', t => {
    const o = {
        x: {y: {z: 0}},
        a: [{b: {c: 0}}],
    };
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
    t.true(Object.isFrozen(o.x));
    t.true(Object.isFrozen(o.x.y));
    t.true(Object.isFrozen(o.x.y.z));
    t.true(Object.isFrozen(o.a));
    t.true(Object.isFrozen(o.a[0]));
    t.true(Object.isFrozen(o.a[0].b));
    t.true(Object.isFrozen(o.a[0].b.c));
});

test('circular reference', t => {
    const o1 = {};
    const o2 = {};
    o1.o = o2;
    o2.o = o1;
    t.notThrows(() => deepFreeze(o1));
    t.notThrows(() => deepFreeze(o2));
    t.true(Object.isFrozen(o1));
    t.true(Object.isFrozen(o1.o));
    t.true(Object.isFrozen(o2));
    t.true(Object.isFrozen(o2.o));
});

test('function', t => {
    const f = function(){};
    const fP = Object.getPrototypeOf(f);
    t.notThrows(() => deepFreeze(fP));
    t.true(Object.isFrozen(fP));
});

test('pure object', t => {
    const o = Object.create(null);
    o.o = Object.create(null);
    o.o.o = Object.create(null);
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
    t.true(Object.isFrozen(o.o));
    t.true(Object.isFrozen(o.o.o));
});

test('non enumerable props', t => {
    const o = {};
    Object.defineProperty(o, 'nonEnumerable', {
        enumerable: false,
        value: 0,
    });
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
    t.true(Object.isFrozen(o.nonEnumerable));
});

test('Symbol key property', t => {
    const o = {};
    const s = Symbol('test');
    o[s] = {a: 0};
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
    t.true(Object.isFrozen(o[s]));
    t.true(Object.isFrozen(o[s].a));
});

test('Typed arrays', t => {
    const o = {
        b: Buffer.from('test'),
        u: new Uint16Array(4),
    };
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
});

test('Frozen nested nodes', t => {
    const x = {y: {z: 0}};
    Object.freeze(x);
    const o = {x};
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
    t.true(Object.isFrozen(o.x));
    t.true(Object.isFrozen(o.x.y));
    t.true(Object.isFrozen(o.x.y.z));
});

test('prototype chain', t => {
    const F = function(){
        this.field = 1;
    };
    F.prototype.staticField = {};
    const item = new F();
    const o = Object.create(item);
    t.notThrows(() => deepFreeze(o));
    t.true(Object.isFrozen(o));
    t.true(Object.isFrozen(o.field));
    t.false(Object.isFrozen(o.staticField));
    t.false(Object.isFrozen(o.toLocaleString));
    t.false(Object.isFrozen(Object.toLocaleString));
});
