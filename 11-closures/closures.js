// ─── Closures ────────────────────────────────────────────────────────────────

// A closure is a function that remembers the variables from its outer scope
// even after that outer function has returned.
// Think of it like a function carrying a backpack of its surrounding variables.


// ─── Basic Closure ────────────────────────────────────────────────────────────

function outer() {
    const message = "hello from outer";

    function inner() {
        console.log(message);  // inner remembers message even after outer() finishes
    }

    return inner;
}

const fn = outer();
fn();  // "hello from outer" — outer() is done, but message is still alive


// ─── Counter — classic closure pattern ───────────────────────────────────────

function createCounter(start = 0) {
    let count = start;  // private to createCounter's scope

    return {
        increment() { count++; },
        decrement() { count--; },
        reset()     { count = start; },
        value()     { return count; }
    };
}

const counter = createCounter(10);
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value());  // 12

// each call to createCounter gets its own independent count
const counterA = createCounter();
const counterB = createCounter();
counterA.increment();
counterA.increment();
counterB.increment();
console.log(counterA.value());  // 2
console.log(counterB.value());  // 1 — independent


// ─── Function Factory ────────────────────────────────────────────────────────

function multiplier(factor) {
    return (n) => n * factor;  // factor is closed over
}

const double  = multiplier(2);
const triple  = multiplier(3);
const tenX    = multiplier(10);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(tenX(5));     // 50


// ─── Closure for Private State ────────────────────────────────────────────────

function createBankAccount(initialBalance) {
    let balance = initialBalance;  // can't be accessed directly from outside

    return {
        deposit(amount) {
            if (amount <= 0) throw new Error("Invalid amount");
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount > balance) throw new Error("Insufficient funds");
            balance -= amount;
            return balance;
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance());  // 1300
// console.log(account.balance);    // undefined — balance is private


// ─── Closure with loops (the right way) ──────────────────────────────────────

// See also: scope-hoisting.js for the var-in-loop bug

const handlers = [];

for (let i = 0; i < 3; i++) {
    handlers.push(() => console.log(`Handler ${i}`));  // let creates new binding per iteration
}

handlers[0]();  // "Handler 0"
handlers[1]();  // "Handler 1"
handlers[2]();  // "Handler 2"


// ─── Memoization using Closure ────────────────────────────────────────────────

function memoize(fn) {
    const cache = {};  // shared across all calls via closure

    return function(...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            console.log(`[cache hit] ${key}`);
            return cache[key];
        }
        cache[key] = fn(...args);
        return cache[key];
    };
}

function expensiveCalc(n) {
    console.log(`Computing for ${n}...`);
    return n * n;
}

const memoCalc = memoize(expensiveCalc);
console.log(memoCalc(5));   // Computing... 25
console.log(memoCalc(5));   // [cache hit] 25
console.log(memoCalc(10));  // Computing... 100


// ─── Partial Application using Closure ───────────────────────────────────────

function createApiRequest(baseUrl, apiKey) {
    return function(endpoint, method = "GET") {
        return {
            url: `${baseUrl}${endpoint}`,
            headers: { "Authorization": `Bearer ${apiKey}` },
            method
        };
    };
}

const request = createApiRequest("https://api.myapp.com", "secret-key-123");

console.log(request("/users"));
// { url: "https://api.myapp.com/users", headers: { Authorization: "Bearer secret-key-123" }, method: "GET" }

console.log(request("/orders", "POST"));
// { url: "https://api.myapp.com/orders", ... method: "POST" }


// ─── Once — run a function only once ─────────────────────────────────────────

function once(fn) {
    let called = false;
    let result;
    return function(...args) {
        if (!called) {
            called = true;
            result = fn(...args);
        }
        return result;
    };
}

const initDB = once(() => {
    console.log("DB connection initialized");
    return "connection_pool_1";
});

console.log(initDB());  // "DB connection initialized" → "connection_pool_1"
console.log(initDB());  // no log, just → "connection_pool_1"
console.log(initDB());  // same
