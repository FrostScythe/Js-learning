// ─── Operators ────────────────────────────────────────────────────────────────


// ─── Arithmetic ───────────────────────────────────────────────────────────────

console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.3333... (no integer division by default)
console.log(10 % 3);   // 1  — modulus
console.log(2 ** 8);   // 256 — exponentiation (like Math.pow)

let x = 5;
console.log(x++);      // 5 — post-increment, returns then increments
console.log(x);        // 6
console.log(++x);      // 7 — pre-increment, increments then returns


// ─── Assignment ───────────────────────────────────────────────────────────────

let n = 10;
n += 5;   // n = 15
n -= 3;   // n = 12
n *= 2;   // n = 24
n /= 4;   // n = 6
n **= 2;  // n = 36
n %= 10;  // n = 6
console.log(n);


// ─── Comparison ───────────────────────────────────────────────────────────────

// == loose equality — coerces types (avoid unless intentional)
console.log(5 == "5");    // true
console.log(0 == false);  // true

// === strict equality — no type coercion (prefer this always)
console.log(5 === "5");   // false
console.log(5 === 5);     // true

console.log(5 != "5");    // false  (loose)
console.log(5 !== "5");   // true   (strict)

console.log(10 > 5);      // true
console.log(10 >= 10);    // true
console.log(3 < 5);       // true


// ─── Logical ──────────────────────────────────────────────────────────────────

console.log(true && false);   // false — AND
console.log(true || false);   // true  — OR
console.log(!true);           // false — NOT

// Short-circuit evaluation
let isLoggedIn = true;
let userName = isLoggedIn && "ayush";  // "ayush" — right side only evaluated if left is truthy
console.log(userName);

let role = null;
let defaultRole = role || "guest";     // "guest" — fallback when left is falsy
console.log(defaultRole);


// ─── Nullish Coalescing (??) ──────────────────────────────────────────────────

// ?? only falls back if left side is null or undefined (not 0, "", false)
let retries = 0;
console.log(retries || 3);   // 3   — wrong, 0 is falsy
console.log(retries ?? 3);   // 0   — correct, 0 is not null/undefined


// ─── Optional Chaining (?.) ───────────────────────────────────────────────────

let userProfile = { address: { city: "Noida" } };
let emptyProfile = null;

console.log(userProfile?.address?.city);   // "Noida"
console.log(emptyProfile?.address?.city);  // undefined — no crash


// ─── Ternary ──────────────────────────────────────────────────────────────────

let status = 200;
let message = status === 200 ? "OK" : "Error";
console.log(message);  // "OK"


// ─── Bitwise (useful in low-level / flags) ────────────────────────────────────

console.log(5 & 3);    // 1   — AND
console.log(5 | 3);    // 7   — OR
console.log(5 ^ 3);    // 6   — XOR
console.log(~5);       // -6  — NOT
console.log(5 << 1);   // 10  — left shift
console.log(5 >> 1);   // 2   — right shift


// ─── typeof & instanceof ─────────────────────────────────────────────────────

console.log(typeof "hello");         // "string"
console.log(typeof 42);              // "number"

console.log([] instanceof Array);    // true
console.log({} instanceof Object);   // true


// ─── Spread & Rest (operators, not just syntax) ───────────────────────────────

// spread — expands iterable
let base = [1, 2, 3];
let extended = [...base, 4, 5];
console.log(extended);  // [1, 2, 3, 4, 5]

// rest — collects remaining args
function sum(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4));  // 10
