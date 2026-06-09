// ─── Objects ──────────────────────────────────────────────────────────────────


// ─── Creation ─────────────────────────────────────────────────────────────────

const user = {
    id: 1,
    name: "ayush",
    role: "developer",
    active: true
};

// property access
console.log(user.name);          // "ayush"
console.log(user["role"]);       // "developer" — bracket notation (useful for dynamic keys)

// add / update / delete
user.email = "ayush@dev.com";    // add
user.role = "senior dev";        // update
delete user.active;              // delete
console.log(user);


// ─── Shorthand Property Names ─────────────────────────────────────────────────

const name = "ayush";
const role = "backend";

const profile = { name, role };   // same as { name: name, role: role }
console.log(profile);


// ─── Computed Property Keys ───────────────────────────────────────────────────

const field = "status";
const record = {
    id: 101,
    [field]: "active",            // dynamic key
    [`${field}Code`]: 1
};
console.log(record);  // { id: 101, status: "active", statusCode: 1 }


// ─── Methods inside Objects ───────────────────────────────────────────────────

const service = {
    name: "PaymentService",
    baseUrl: "https://api.payments.dev",

    getEndpoint(path) {
        return `${this.baseUrl}/${path}`;
    },

    ping: function() {
        return `Pinging ${this.name}`;
    }
};

console.log(service.getEndpoint("charge"));  // "https://api.payments.dev/charge"
console.log(service.ping());                 // "Pinging PaymentService"


// ─── Destructuring ────────────────────────────────────────────────────────────

const { id, name: userName, role: userRole = "viewer" } = user;
//                ↑ rename       ↑ default value if key missing
console.log(id, userName, userRole);

// in function parameters
function displayUser({ name, role }) {
    console.log(`${name} — ${role}`);
}
displayUser(user);


// ─── Spread ───────────────────────────────────────────────────────────────────

const defaults = { timeout: 3000, retries: 3, verbose: false };
const custom   = { retries: 5, verbose: true };

const finalConfig = { ...defaults, ...custom };  // custom overrides defaults
console.log(finalConfig);  // { timeout: 3000, retries: 5, verbose: true }

// clone (shallow)
const clone = { ...user };
clone.name = "ghost";
console.log(user.name);   // "ayush" — original untouched


// ─── Nested Objects ───────────────────────────────────────────────────────────

const server = {
    host: "localhost",
    database: {
        name: "app_db",
        port: 5432,
        credentials: {
            username: "admin",
            password: "secret"
        }
    }
};

console.log(server.database.credentials.username);  // "admin"

// optional chaining for safe access
console.log(server?.cache?.ttl);  // undefined — no crash


// ─── Object Methods (built-in) ────────────────────────────────────────────────

const config = { host: "localhost", port: 8080, env: "dev" };

console.log(Object.keys(config));    // ["host", "port", "env"]
console.log(Object.values(config));  // ["localhost", 8080, "dev"]
console.log(Object.entries(config)); // [["host","localhost"], ["port",8080], ["env","dev"]]

// iterate with entries
Object.entries(config).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Object.assign — merge (mutates target)
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 });
console.log(target);  // { a: 1, b: 2, c: 3 }

// Object.freeze — makes object immutable (shallow)
const constants = Object.freeze({ PI: 3.14, E: 2.71 });
constants.PI = 99;  // silently ignored in non-strict, throws in strict mode
console.log(constants.PI);  // 3.14

// check if key exists
console.log("host" in config);              // true
console.log(config.hasOwnProperty("env")); // true


// ─── Object as a Map (string keys) ───────────────────────────────────────────

const errorMessages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error"
};

function getErrorMessage(code) {
    return errorMessages[code] ?? "Unknown Error";
}

console.log(getErrorMessage(404));  // "Not Found"
console.log(getErrorMessage(503));  // "Unknown Error"
