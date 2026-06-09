// ─── Strings ──────────────────────────────────────────────────────────────────


// ─── Creation ─────────────────────────────────────────────────────────────────

const single  = 'hello';
const double  = "world";
const backtick = `template literal`;

// template literals — preferred for interpolation
const name = "ayush";
const role = "backend dev";
console.log(`Name: ${name}, Role: ${role}`);

// multiline string
const message = `
  Dear ${name},
  Welcome aboard!
`;
console.log(message);


// ─── Basic Properties ─────────────────────────────────────────────────────────

const str = "Hello, World!";

console.log(str.length);    // 13
console.log(str[0]);        // "H"
console.log(str[str.length - 1]);  // "!"


// ─── Case ─────────────────────────────────────────────────────────────────────

console.log(str.toUpperCase());  // "HELLO, WORLD!"
console.log(str.toLowerCase());  // "hello, world!"


// ─── Trim ─────────────────────────────────────────────────────────────────────

const padded = "   api response   ";
console.log(padded.trim());        // "api response"
console.log(padded.trimStart());   // "api response   "
console.log(padded.trimEnd());     // "   api response"


// ─── Searching ────────────────────────────────────────────────────────────────

const url = "https://api.example.com/users/42";

console.log(url.includes("example"));       // true
console.log(url.startsWith("https"));       // true
console.log(url.endsWith("42"));            // true
console.log(url.indexOf("users"));          // 26
console.log(url.lastIndexOf("/"));          // 32
console.log(url.search(/\/\d+$/));          // 32 — regex search


// ─── Slice & Substring ────────────────────────────────────────────────────────

const path = "/api/v1/products";

console.log(path.slice(1));         // "api/v1/products"
console.log(path.slice(5, 7));      // "v1"
console.log(path.slice(-8));        // "products"  — negative counts from end
console.log(path.substring(1, 4));  // "api"


// ─── Replace ──────────────────────────────────────────────────────────────────

const env = "host=localhost;port=5432;db=mydb";

console.log(env.replace("localhost", "prod-server"));  // replaces first match
console.log("aabbcc".replaceAll("b", "X"));            // "aaXXcc"

// with regex
console.log("GET /api/v1".replace(/v\d+/, "v2"));      // "GET /api/v2"


// ─── Split & Join ─────────────────────────────────────────────────────────────

const csv = "ayush,developer,noida,java";
const parts = csv.split(",");
console.log(parts);  // ["ayush", "developer", "noida", "java"]

const joined = parts.join(" | ");
console.log(joined);  // "ayush | developer | noida | java"

// split into characters
console.log("hello".split(""));  // ["h", "e", "l", "l", "o"]


// ─── Repeat & Pad ────────────────────────────────────────────────────────────

console.log("-".repeat(30));              // "------------------------------"
console.log("5".padStart(4, "0"));        // "0005" — useful for IDs
console.log("status".padEnd(12, "."));   // "status......"


// ─── charAt & charCodeAt ──────────────────────────────────────────────────────

console.log("hello".charAt(1));      // "e"
console.log("A".charCodeAt(0));      // 65
console.log(String.fromCharCode(65));  // "A"


// ─── String → Number & back ───────────────────────────────────────────────────

console.log(parseInt("42px"));         // 42
console.log(parseFloat("3.14rem"));    // 3.14
console.log(Number("100"));            // 100
console.log(String(404));              // "404"
console.log((255).toString(16));       // "ff" — hex


// ─── Useful Patterns ──────────────────────────────────────────────────────────

// check empty / blank
const input = "   ";
console.log(input.trim().length === 0);  // true

// extract path segments
const apiPath = "/api/v1/orders/99";
const segments = apiPath.split("/").filter(Boolean);
console.log(segments);  // ["api", "v1", "orders", "99"]

// build query string from object
const params = { page: 1, limit: 10, status: "active" };
const query = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
console.log(`/api/orders?${query}`);  // /api/orders?page=1&limit=10&status=active
