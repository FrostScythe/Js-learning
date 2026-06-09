// ─── Functions ────────────────────────────────────────────────────────────────


// ─── Function Declaration ─────────────────────────────────────────────────────

function add(a, b) {
    return a + b;
}
console.log(add(3, 4));  // 7


// ─── Function Expression ──────────────────────────────────────────────────────

const multiply = function(a, b) {
    return a * b;
};
console.log(multiply(3, 4));  // 12


// ─── Arrow Functions ──────────────────────────────────────────────────────────

const subtract = (a, b) => a - b;          // implicit return
const square = n => n * n;                 // single param — no parens needed
const greet = () => "Hello!";             // no params

console.log(subtract(10, 3));  // 7
console.log(square(5));        // 25
console.log(greet());          // "Hello!"

// multi-line arrow function needs explicit return
const divide = (a, b) => {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
};
console.log(divide(10, 2));  // 5


// ─── Default Parameters ───────────────────────────────────────────────────────

function createUser(name, role = "viewer", active = true) {
    return { name, role, active };
}
console.log(createUser("ayush", "admin"));   // { name: "ayush", role: "admin", active: true }
console.log(createUser("guest"));             // { name: "guest", role: "viewer", active: true }


// ─── Rest Parameters ──────────────────────────────────────────────────────────

function logTags(primary, ...rest) {
    console.log("Primary:", primary);
    console.log("Others:", rest);
}
logTags("java", "spring", "microservices", "docker");
// Primary: java
// Others: ["spring", "microservices", "docker"]


// ─── Arguments Object (old style, only in regular functions) ─────────────────

function oldSum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log(oldSum(1, 2, 3));  // 6


// ─── Returning Multiple Values via Destructuring ──────────────────────────────

function getMinMax(arr) {
    return { min: Math.min(...arr), max: Math.max(...arr) };
}
const { min, max } = getMinMax([3, 1, 9, 5]);
console.log(min, max);  // 1 9


// ─── First-Class Functions (functions as values) ──────────────────────────────

function applyOperation(a, b, operation) {
    return operation(a, b);
}
console.log(applyOperation(6, 3, divide));   // 2
console.log(applyOperation(6, 3, multiply)); // 18


// ─── IIFE — Immediately Invoked Function Expression ───────────────────────────

const result = (function() {
    const secret = "not exposed";
    return secret.toUpperCase();
})();
console.log(result);  // "NOT EXPOSED"


// ─── Pure Functions (no side effects — important for functional style) ─────────

// impure — modifies external state
let total = 0;
function addToTotal(n) {
    total += n;  // side effect
}

// pure — same input always gives same output, no side effects
function pureAdd(a, b) {
    return a + b;
}


// ─── Function Hoisting ────────────────────────────────────────────────────────

console.log(hoisted(2, 3));  // 5 — works before declaration

function hoisted(a, b) {
    return a + b;
}

// console.log(notHoisted(2, 3));  // ReferenceError — expressions are NOT hoisted
const notHoisted = (a, b) => a + b;


// ─── Recursion ────────────────────────────────────────────────────────────────

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5));  // 120

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(8));  // 21
