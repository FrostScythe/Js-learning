// ─── Arrays ───────────────────────────────────────────────────────────────────


// ─── Creation ─────────────────────────────────────────────────────────────────

const empty = [];
const nums = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, null, { key: "val" }];  // JS arrays can hold anything
const matrix = [[1, 2], [3, 4], [5, 6]];               // 2D array

console.log(nums.length);  // 5
console.log(nums[0]);      // 1  (0-indexed like Java)
console.log(nums[nums.length - 1]);  // 5 — last element


// ─── Add / Remove ─────────────────────────────────────────────────────────────

const stack = ["a", "b", "c"];

stack.push("d");           // add to end
console.log(stack);        // ["a", "b", "c", "d"]

stack.pop();               // remove from end
console.log(stack);        // ["a", "b", "c"]

stack.unshift("z");        // add to beginning
console.log(stack);        // ["z", "a", "b", "c"]

stack.shift();             // remove from beginning
console.log(stack);        // ["a", "b", "c"]


// ─── splice — mutates the array ───────────────────────────────────────────────

const arr = [1, 2, 3, 4, 5];

arr.splice(2, 1);          // remove 1 element at index 2
console.log(arr);          // [1, 2, 4, 5]

arr.splice(2, 0, 99, 100); // insert at index 2, remove nothing
console.log(arr);          // [1, 2, 99, 100, 4, 5]


// ─── slice — does NOT mutate, returns new array ───────────────────────────────

const original = [10, 20, 30, 40, 50];
const sliced = original.slice(1, 4);   // index 1 to 3 (end is exclusive)
console.log(sliced);    // [20, 30, 40]
console.log(original);  // unchanged


// ─── Searching ────────────────────────────────────────────────────────────────

const services = ["auth", "payment", "notification", "order"];

console.log(services.indexOf("payment"));        // 1
console.log(services.indexOf("gateway"));        // -1 — not found
console.log(services.includes("order"));         // true
console.log(services.find(s => s.length > 8));   // "notification"
console.log(services.findIndex(s => s === "order"));  // 3


// ─── Iteration ────────────────────────────────────────────────────────────────

const prices = [100, 200, 300];

prices.forEach((price, index) => {
    console.log(`[${index}] ₹${price}`);
});


// ─── map — transform each element, returns new array ──────────────────────────

const doubled = prices.map(p => p * 2);
console.log(doubled);  // [200, 400, 600]


// ─── filter — keep elements that pass the test ────────────────────────────────

const expensive = prices.filter(p => p > 150);
console.log(expensive);  // [200, 300]


// ─── reduce — accumulate to a single value ────────────────────────────────────

const total = prices.reduce((acc, p) => acc + p, 0);
console.log(total);  // 600


// ─── Chaining map + filter + reduce ──────────────────────────────────────────

const orders = [
    { id: 1, amount: 500, status: "delivered" },
    { id: 2, amount: 200, status: "pending" },
    { id: 3, amount: 800, status: "delivered" },
    { id: 4, amount: 150, status: "cancelled" },
];

const totalDelivered = orders
    .filter(o => o.status === "delivered")
    .map(o => o.amount)
    .reduce((sum, amount) => sum + amount, 0);

console.log(totalDelivered);  // 1300


// ─── sort ─────────────────────────────────────────────────────────────────────

const scores = [40, 100, 1, 5, 25, 10];

scores.sort((a, b) => a - b);   // ascending
console.log(scores);            // [1, 5, 10, 25, 40, 100]

scores.sort((a, b) => b - a);   // descending
console.log(scores);            // [100, 40, 25, 10, 5, 1]

const names = ["Zara", "Alice", "Mike"];
names.sort();  // alphabetical — default sort works for strings
console.log(names);  // ["Alice", "Mike", "Zara"]


// ─── flat & flatMap ───────────────────────────────────────────────────────────

const nested = [[1, 2], [3, 4], [5]];
console.log(nested.flat());       // [1, 2, 3, 4, 5]

const sentences = ["hello world", "foo bar"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words);  // ["hello", "world", "foo", "bar"]


// ─── Spread & Destructuring ───────────────────────────────────────────────────

const a = [1, 2, 3];
const b = [4, 5, 6];
const merged = [...a, ...b];
console.log(merged);  // [1, 2, 3, 4, 5, 6]

const [first, second, ...rest] = merged;
console.log(first);   // 1
console.log(second);  // 2
console.log(rest);    // [3, 4, 5, 6]


// ─── Useful Utilities ─────────────────────────────────────────────────────────

console.log(Array.isArray(nums));     // true
console.log(Array.isArray("hello"));  // false

const fromStr = Array.from("hello");
console.log(fromStr);  // ["h", "e", "l", "l", "o"]

const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range);  // [1, 2, 3, 4, 5]

// remove duplicates
const withDupes = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(withDupes)];
console.log(unique);  // [1, 2, 3, 4]
