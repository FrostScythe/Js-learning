// ─── Type Conversion ──────────────────────────────────────────────────────────

// JS has two kinds: implicit (coercion) and explicit (conversion)
// Implicit coercion is where most bugs come from — know it well.


// ─── To String ────────────────────────────────────────────────────────────────

console.log(String(42));         // "42"
console.log(String(true));       // "true"
console.log(String(false));      // "false"
console.log(String(null));       // "null"
console.log(String(undefined));  // "undefined"
console.log(String([1, 2, 3]));  // "1,2,3"

console.log((42).toString());        // "42"
console.log((255).toString(16));     // "ff"
console.log((8).toString(2));        // "1000"


// ─── To Number ────────────────────────────────────────────────────────────────

console.log(Number("42"));         // 42
console.log(Number("3.14"));       // 3.14
console.log(Number(""));           // 0
console.log(Number(" "));          // 0
console.log(Number("42px"));       // NaN  — can't parse
console.log(Number(true));         // 1
console.log(Number(false));        // 0
console.log(Number(null));         // 0
console.log(Number(undefined));    // NaN
console.log(Number([]));           // 0
console.log(Number([1]));          // 1
console.log(Number([1, 2]));       // NaN

// parseInt / parseFloat — more lenient, parses what it can
console.log(parseInt("42px"));     // 42
console.log(parseInt("3.99"));     // 3    — truncates (not rounds)
console.log(parseFloat("3.14rem")); // 3.14
console.log(parseInt("px42"));     // NaN  — must start with digit


// ─── To Boolean ───────────────────────────────────────────────────────────────

// Falsy values: false, 0, -0, 0n, "", null, undefined, NaN
// Everything else is truthy

console.log(Boolean(0));          // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false

console.log(Boolean(1));          // true
console.log(Boolean("0"));        // true  — non-empty string, even "0"
console.log(Boolean([]));         // true  — empty array is truthy
console.log(Boolean({}));         // true  — empty object is truthy

// double NOT trick
console.log(!!"hello");   // true
console.log(!!0);         // false
console.log(!!null);      // false


// ─── Implicit Coercion — where bugs hide ─────────────────────────────────────

// + operator: if either side is a string, it concatenates
console.log("5" + 3);     // "53"   — 3 coerced to string
console.log(5 + "3");     // "53"
console.log(5 + 3 + "1"); // "81"   — left to right: 8 then "81"
console.log("1" + 5 + 3); // "153"

// -, *, /, % coerce strings to numbers
console.log("10" - 5);    // 5
console.log("10" * "2");  // 20
console.log("10" / "2");  // 5
console.log("10" % 3);    // 1

// comparison coercion
console.log("5" == 5);    // true  — loose equality coerces
console.log("5" === 5);   // false — strict, no coercion

console.log(null == undefined);   // true
console.log(null === undefined);  // false
console.log(null == 0);           // false — null only equals undefined loosely
console.log(null > 0);            // false
console.log(null >= 0);           // true  — bizarre JS behavior

// boolean in arithmetic
console.log(true + true);   // 2
console.log(false + 1);     // 1
console.log(true + "1");    // "true1"


// ─── NaN ──────────────────────────────────────────────────────────────────────

const bad = Number("hello");
console.log(bad);             // NaN
console.log(typeof bad);      // "number" — NaN is a number type, quirky

console.log(NaN === NaN);     // false — NaN is not equal to itself
console.log(isNaN("hello"));  // true  — coerces then checks
console.log(Number.isNaN("hello")); // false — strict, no coercion
console.log(Number.isNaN(NaN));     // true


// ─── Conversion in the real world ────────────────────────────────────────────

// Reading query params from URL (everything comes as string)
const queryParams = { page: "2", limit: "10", active: "true" };

const page   = Number(queryParams.page);       // 2
const limit  = parseInt(queryParams.limit);    // 10
const active = queryParams.active === "true";  // true — explicit comparison, not Boolean()

console.log(page, limit, active);

// Safe numeric check before processing
function safeParseId(raw) {
    const id = Number(raw);
    if (Number.isNaN(id) || id <= 0) return null;
    return id;
}

console.log(safeParseId("42"));    // 42
console.log(safeParseId("abc"));   // null
console.log(safeParseId("-5"));    // null
console.log(safeParseId("7.9"));   // 7.9
