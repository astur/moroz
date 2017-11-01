const getProps = require('get-props');

module.exports = o => {
    const frozen = new Set();

    const freeze = o => {
        Object.freeze(o);
        frozen.add(o);
        const isF = typeof o === 'function';
        getProps(o, {protos: true, symbols: true})
            .filter(v => !isF || !['caller', 'callee', 'arguments'].includes(v))
            .filter(v => o[v] !== null)
            .filter(v => ['object', 'function'].includes(typeof o[v]))
            .filter(v => !ArrayBuffer.isView(o[v]))
            .filter(v => !frozen.has(o[v]))
            .forEach(v => freeze(o[v]));
    };

    freeze(o);
    return o;
};
