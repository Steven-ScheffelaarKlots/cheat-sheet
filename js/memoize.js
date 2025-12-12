function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('Using a memoized value')
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const expensiveComputation = (num) => {
    // Simulate an expensive computation
    let result = 0;
    result = num * 50;
    return result
}

const memoizedFunction = memoize(expensiveComputation)

memoizedFunction(1)
memoizedFunction(2)
memoizedFunction(1)

module.exports = memoize;