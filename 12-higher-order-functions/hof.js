// ─── Higher-Order Functions ───────────────────────────────────────────────────

// A Higher-Order Function (HOF) either:
//   1. Takes a function as an argument, OR
//   2. Returns a function
// Both patterns are fundamental to functional programming in JS.


// ─── Functions as Arguments ───────────────────────────────────────────────────

function runOperation(a, b, operation) {
    return operation(a, b);
}

console.log(runOperation(10, 3, (a, b) => a + b));   // 13
console.log(runOperation(10, 3, (a, b) => a * b));   // 30
console.log(runOperation(10, 3, Math.max));           // 10


// ─── Built-in HOFs — map, filter, reduce ─────────────────────────────────────

const products = [
    { name: "Laptop",   price: 80000, inStock: true  },
    { name: "Phone",    price: 30000, inStock: true  },
    { name: "Tablet",   price: 45000, inStock: false },
    { name: "Monitor",  price: 20000, inStock: true  },
    { name: "Keyboard", price: 5000,  inStock: false },
];

// map — transform
const names = products.map(p => p.name);
console.log(names);  // ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard"]

// filter — select
const available = products.filter(p => p.inStock);
console.log(available.map(p => p.name));  // ["Laptop", "Phone", "Monitor"]

// reduce — accumulate
const totalInventoryValue = products
    .filter(p => p.inStock)
    .reduce((sum, p) => sum + p.price, 0);
console.log(`₹${totalInventoryValue}`);  // ₹130000

// find
const expensive = products.find(p => p.price > 50000);
console.log(expensive?.name);  // "Laptop"

// every / some
console.log(products.every(p => p.price > 0));     // true
console.log(products.some(p => p.price > 50000));  // true


// ─── Returning Functions ──────────────────────────────────────────────────────

function createValidator(min, max) {
    return (value) => value >= min && value <= max;
}

const isValidAge     = createValidator(18, 60);
const isValidPort    = createValidator(1024, 65535);
const isValidPercent = createValidator(0, 100);

console.log(isValidAge(25));       // true
console.log(isValidAge(15));       // false
console.log(isValidPort(8080));    // true
console.log(isValidPercent(110));  // false


// ─── Function Composition ────────────────────────────────────────────────────

const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe    = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const trim      = str => str.trim();
const lowercase = str => str.toLowerCase();
const split     = str => str.split(" ");

const normalize = pipe(trim, lowercase, split);
console.log(normalize("  Hello World  "));  // ["hello", "world"]

// compose runs right to left, pipe runs left to right
const process = compose(split, lowercase, trim);
console.log(process("  JAVA SPRING  "));    // ["java", "spring"]


// ─── Currying ─────────────────────────────────────────────────────────────────

// transforms f(a, b, c) into f(a)(b)(c)

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...more) => curried(...args, ...more);
    };
}

const add = curry((a, b, c) => a + b + c);

console.log(add(1)(2)(3));      // 6
console.log(add(1, 2)(3));      // 6
console.log(add(1)(2, 3));      // 6
console.log(add(1, 2, 3));      // 6

// practical use: pre-fill arguments
const addTax = curry((taxRate, amount) => amount + (amount * taxRate / 100));
const addGST = addTax(18);  // partially applied

console.log(addGST(1000));  // 1180
console.log(addGST(5000));  // 5900


// ─── Middleware-style pattern (like Express.js) ───────────────────────────────

function createPipeline(...middlewares) {
    return function execute(context) {
        let index = 0;
        function next() {
            if (index < middlewares.length) {
                middlewares[index++](context, next);
            }
        }
        next();
        return context;
    };
}

const logRequest     = (ctx, next) => { console.log(`[LOG] ${ctx.method} ${ctx.path}`); next(); };
const authenticate   = (ctx, next) => { ctx.user = "ayush"; next(); };
const parseBody      = (ctx, next) => { ctx.parsed = true; next(); };

const handleRequest = createPipeline(logRequest, authenticate, parseBody);

const ctx = { method: "POST", path: "/api/orders" };
handleRequest(ctx);
console.log(ctx);
// { method: "POST", path: "/api/orders", user: "ayush", parsed: true }


// ─── Decorators / Wrappers ────────────────────────────────────────────────────

function withLogging(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name} with`, args);
        const result = fn(...args);
        console.log(`${fn.name} returned`, result);
        return result;
    };
}

function add2(a, b) { return a + b; }

const loggedAdd = withLogging(add2);
loggedAdd(3, 4);
// Calling add2 with [3, 4]
// add2 returned 7


function withRetry(fn, retries = 3) {
    return async function(...args) {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn(...args);
            } catch (e) {
                if (i === retries - 1) throw e;
                console.log(`Retry ${i + 1}/${retries}`);
            }
        }
    };
}
