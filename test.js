const test = require('ava');
const m = require('.');

test('Not implemented', t => {
    t.throws(() => m());
});
