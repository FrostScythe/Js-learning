// ─── Scope & Hoisting ────────────────────────────────────────────────────────


// ─── Global Scope ────────────────────────────────────────────────────────────

const appName = "MyApp";  // accessible everywhere in this file

function showApp() {
    console.log(appName);  // works — global is accessible inside functions
}
showApp();


// ─── Function Scope ───────────────────────────────────────────────────────────

function processOrder(orderId) {
    const status = "processing";  // scoped to processOrder
    console.log(`Order ${orderId}: ${status}`);
}
processOrder(99);
// console.log(status);  // ReferenceError — status doesn't exist here


// ─── Block Scope (let & const) ────────────────────────────────────────────────

{
    let blockVar = "I'm block scoped";
    const blockConst = "me too";
    console.log(blockVar);    // works inside the block
}
// console.log(blockVar);   // ReferenceError — outside block

for (let i = 0; i < 3; i++) {
    // i is scoped to this for-loop block
}
// console.log(i);  // ReferenceError


// ─── var is function-scoped (not block-scoped) ───────────────────────────────

function varExample() {
    if (true) {
        var leaks = "I leak out of the if block";
    }
    console.log(leaks);  // "I leak out" — var ignores block boundaries
}
varExample();


// ─── Classic var-in-loop bug ─────────────────────────────────────────────────

// using var — all closures capture the same `i`
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var i:", i), 0);
}
// prints: 3, 3, 3 — NOT 0, 1, 2

// fix with let — each iteration gets its own `i`
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let j:", j), 0);
}
// prints: 0, 1, 2


// ─── Lexical (Static) Scope ───────────────────────────────────────────────────

// functions look up variables where they're DEFINED, not where they're CALLED

const env = "production";

function getEnv() {
    return env;  // looks up in its defining scope (global), not calling scope
}

function simulate() {
    const env = "test";
    console.log(getEnv());  // "production" — lexical scope, NOT "test"
}
simulate();


// ─── Scope Chain ──────────────────────────────────────────────────────────────

const config = { retries: 3 };

function outer() {
    const host = "localhost";

    function inner() {
        const port = 8080;
        // inner can access: port, host, config — walks up the scope chain
        console.log(`${host}:${port} (retries: ${config.retries})`);
    }

    inner();
}
outer();


// ─── Hoisting ─────────────────────────────────────────────────────────────────

// Function declarations are hoisted entirely — can call before declaration
console.log(hoistedFn());  // "I'm hoisted!"

function hoistedFn() {
    return "I'm hoisted!";
}

// var declarations are hoisted but NOT initialized — value is undefined
console.log(hoistedVar);   // undefined (not ReferenceError)
var hoistedVar = "assigned now";
console.log(hoistedVar);   // "assigned now"

// let & const are hoisted but in the "Temporal Dead Zone" — can't access before declaration
// console.log(notYet);    // ReferenceError: Cannot access before initialization
let notYet = "now available";


// ─── Temporal Dead Zone (TDZ) ────────────────────────────────────────────────

{
    // TDZ starts here for `value`
    // console.log(value);  // ReferenceError — in TDZ
    let value = 42;          // TDZ ends here
    console.log(value);      // 42
}


// ─── Function Expression Hoisting ────────────────────────────────────────────

// notHoisted();  // TypeError: notHoisted is not a function
var notHoisted = function() { return "fn expression"; };
// notHoisted2(); // ReferenceError (let is in TDZ)
let notHoisted2 = () => "arrow fn";


// ─── Practical Summary ────────────────────────────────────────────────────────

// 1. Always use const by default
// 2. Use let when you need to reassign
// 3. Never use var in modern JS
// 4. Declare variables at the top of their scope to avoid TDZ confusion
// 5. Function declarations can be used before they're written — useful for readability
