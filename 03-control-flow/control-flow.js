// ─── Control Flow ─────────────────────────────────────────────────────────────


// ─── if / else if / else ──────────────────────────────────────────────────────

let statusCode = 404;

if (statusCode === 200) {
    console.log("OK");
} else if (statusCode === 404) {
    console.log("Not Found");
} else if (statusCode === 500) {
    console.log("Internal Server Error");
} else {
    console.log("Unknown status");
}


// ─── Truthy & Falsy ───────────────────────────────────────────────────────────

// Falsy values: false, 0, "", null, undefined, NaN
// Everything else is truthy

let token = "";
if (!token) {
    console.log("No token provided");  // runs — empty string is falsy
}

let user = { name: "ayush" };
if (user) {
    console.log("User exists");        // runs — objects are always truthy
}


// ─── switch ───────────────────────────────────────────────────────────────────

let httpMethod = "POST";

switch (httpMethod) {
    case "GET":
        console.log("Fetching data");
        break;
    case "POST":
        console.log("Creating resource");
        break;
    case "PUT":
    case "PATCH":
        console.log("Updating resource");  // fall-through for both PUT and PATCH
        break;
    case "DELETE":
        console.log("Deleting resource");
        break;
    default:
        console.log("Unsupported method");
}


// ─── Ternary ──────────────────────────────────────────────────────────────────

let isAuthenticated = true;
let access = isAuthenticated ? "granted" : "denied";
console.log(access);  // "granted"


// ─── Nested ternary — keep shallow, or use if-else ───────────────────────────

let score = 75;
let grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : "F";
console.log(grade);  // "B"


// ─── Short-circuit as conditional ────────────────────────────────────────────

let debugMode = true;
debugMode && console.log("Debug: app started");  // runs only if debugMode is truthy


// ─── Nullish Coalescing in conditions ─────────────────────────────────────────

function getPort(config) {
    return config?.port ?? 8080;
}
console.log(getPort({ port: 3000 }));  // 3000
console.log(getPort({}));              // 8080
console.log(getPort(null));            // 8080


// ─── Guard Clauses — Java devs will appreciate this pattern ───────────────────

// instead of deeply nested if-else, return early
function processRequest(req) {
    if (!req) return "No request";
    if (!req.body) return "No body";
    if (!req.body.userId) return "No userId";

    return `Processing for user ${req.body.userId}`;
}

console.log(processRequest(null));                          // "No request"
console.log(processRequest({ body: null }));                // "No body"
console.log(processRequest({ body: { userId: 42 } }));     // "Processing for user 42"


// ─── try / catch / finally ────────────────────────────────────────────────────

function parseJSON(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.log("Invalid JSON:", e.message);
        return null;
    } finally {
        console.log("parseJSON called");   // always runs
    }
}

parseJSON('{"key":"value"}');   // returns object
parseJSON("not json");          // catches error, returns null


// ─── throw ────────────────────────────────────────────────────────────────────

function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}

try {
    console.log(divide(10, 2));   // 5
    console.log(divide(10, 0));   // throws
} catch (e) {
    console.log(e.message);       // "Division by zero"
}
