// ─── Variables & Datatypes ───────────────────────────────────────────────────

// var is function-scoped (old way, avoid it)
var oldSchool = "I'm var";

// let is block-scoped, reassignable
let count = 0;
count = 1;

// const is block-scoped, not reassignable
const MAX_RETRIES = 3;


// ─── Primitive Types ──────────────────────────────────────────────────────────

let username = "ayush";           // string
let age = 22;                     // number
let price = 99.99;                // number (no int/float split like Java)
let isActive = true;              // boolean
let data = null;                  // null — intentional absence of value
let notAssigned;                  // undefined — declared but not assigned
let id = Symbol("userId");        // symbol — unique identifier


// ─── typeof ───────────────────────────────────────────────────────────────────

console.log(typeof username);     // "string"
console.log(typeof age);          // "number"
console.log(typeof isActive);     // "boolean"
console.log(typeof null);         // "object" — known JS quirk, null is NOT an object
console.log(typeof notAssigned);  // "undefined"
console.log(typeof id);           // "symbol"


// ─── BigInt (for numbers beyond Number.MAX_SAFE_INTEGER) ──────────────────────

const bigNumber = 9007199254740991n;
console.log(typeof bigNumber);    // "bigint"


// ─── Reference Types ──────────────────────────────────────────────────────────

// Objects, Arrays, Functions are reference types — stored by reference, not value
let user = { name: "ayush", role: "developer" };
let scores = [95, 87, 100];
let greet = function() { return "hello"; };

console.log(typeof user);         // "object"
console.log(typeof scores);       // "object" (arrays are objects under the hood)
console.log(typeof greet);        // "function"


// ─── const with objects/arrays — reference is locked, contents are not ────────

const config = { env: "dev", port: 8080 };
config.port = 9090;               // allowed — mutating the object
// config = {};                   // TypeError — can't reassign the reference

const tags = ["java", "spring"];
tags.push("js");                  // allowed
console.log(tags);                // ["java", "spring", "js"]


// ─── let vs var scoping ───────────────────────────────────────────────────────

function scopeDemo() {
    if (true) {
        var x = "var";   // leaks out of the if block
        let y = "let";   // stays inside the if block
    }
    console.log(x);      // "var"
    // console.log(y);   // ReferenceError
}
scopeDemo();


// ─── Null vs Undefined ────────────────────────────────────────────────────────

let token = null;         // explicitly set to "no value"
let session;              // not yet assigned

console.log(token == session);    // true  (loose equality — both nullish)
console.log(token === session);   // false (strict equality — different types)
