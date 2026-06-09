// ─── Loops ────────────────────────────────────────────────────────────────────


// ─── for ──────────────────────────────────────────────────────────────────────

for (let i = 0; i < 5; i++) {
    process.stdout.write(i + " ");  // 0 1 2 3 4
}
console.log();

// reverse
for (let i = 4; i >= 0; i--) {
    process.stdout.write(i + " ");  // 4 3 2 1 0
}
console.log();

// step
for (let i = 0; i <= 10; i += 2) {
    process.stdout.write(i + " ");  // 0 2 4 6 8 10
}
console.log();


// ─── while ────────────────────────────────────────────────────────────────────

let retries = 0;
while (retries < 3) {
    console.log(`Attempt ${retries + 1}`);
    retries++;
}


// ─── do...while ───────────────────────────────────────────────────────────────

let input = 0;
do {
    console.log(`Processing: ${input}`);
    input++;
} while (input < 3);
// always runs at least once — unlike while


// ─── for...of — iterating values ──────────────────────────────────────────────

const services = ["auth", "payment", "order", "notification"];

for (const service of services) {
    console.log(service);
}

// with index using entries()
for (const [index, service] of services.entries()) {
    console.log(`${index}: ${service}`);
}

// works on strings too
for (const char of "hello") {
    process.stdout.write(char + "-");  // h-e-l-l-o-
}
console.log();


// ─── for...in — iterating keys ────────────────────────────────────────────────

const config = { host: "localhost", port: 8080, env: "dev" };

for (const key in config) {
    console.log(`${key} → ${config[key]}`);
}
// host → localhost
// port → 8080
// env  → dev

// Note: for...in also iterates inherited properties — use hasOwnProperty to be safe
for (const key in config) {
    if (config.hasOwnProperty(key)) {
        console.log(key);
    }
}


// ─── break & continue ────────────────────────────────────────────────────────

const requests = [
    { id: 1, status: "ok" },
    { id: 2, status: "ok" },
    { id: 3, status: "error" },
    { id: 4, status: "ok" },
];

// break — stop the loop entirely
for (const req of requests) {
    if (req.status === "error") {
        console.log(`Stopped at request ${req.id}`);
        break;
    }
    console.log(`Processed request ${req.id}`);
}

// continue — skip current iteration
for (const req of requests) {
    if (req.status === "error") continue;
    console.log(`Request ${req.id} handled`);
}


// ─── Nested Loops ────────────────────────────────────────────────────────────

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (const row of matrix) {
    console.log(row.join(" | "));
}


// ─── Labeled break (rare but useful) ─────────────────────────────────────────

outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) break outer;  // breaks the outer loop
        console.log(`i=${i} j=${j}`);
    }
}


// ─── Array loop methods (preferred over manual loops) ─────────────────────────

const amounts = [100, 250, 300, 50, 475];

// forEach — iterate with side effects
amounts.forEach(a => console.log(`₹${a}`));

// every — checks if ALL pass
const allPositive = amounts.every(a => a > 0);
console.log(allPositive);  // true

// some — checks if ANY passes
const hasLarge = amounts.some(a => a > 400);
console.log(hasLarge);  // true


// ─── while with iterator pattern ──────────────────────────────────────────────

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();
console.log(gen.next().value);  // 1
console.log(gen.next().value);  // 2
console.log(gen.next().value);  // 3
