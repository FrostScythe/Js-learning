// ─── Events ───────────────────────────────────────────────────────────────────

// An event is something that happens in the browser — a click, a keypress,
// a page load, a mouse move. JS can listen for these and react.


// ─── DOMContentLoaded ─────────────────────────────────────────────────────────

// Fires when the HTML is fully parsed and the DOM is ready.
// Does NOT wait for images, stylesheets, or other external resources.
// Best practice: wrap your DOM code inside this so you're sure elements exist.

// "load" fires after everything (images, CSS) is also downloaded — usually too late.

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready — document.readyState:", document.readyState);
    // "interactive" — HTML parsed, DOM built, external resources may still be loading
});

window.addEventListener("load", () => {
    console.log("page fully loaded — images and CSS also done");
});


// ─── addEventListener ──────────────────────────────────────────────────────────

// element.addEventListener(eventType, handler, options)
// eventType → string: "click", "keydown", "submit", "input", etc.
// handler   → function that receives the Event object
// options   → optional: { once, capture, passive }

const clickBtn = document.getElementById("click-btn");

clickBtn.addEventListener("click", function(event) {
    console.log("clicked!");
    console.log("event type:", event.type);           // "click"
    console.log("target:", event.target);             // the element clicked
    console.log("target id:", event.target.id);       // "click-btn"
    console.log("timestamp:", event.timeStamp);

    document.getElementById("click-output").textContent = "Button clicked!";
});

// arrow function works too (but `this` won't refer to the element)
clickBtn.addEventListener("click", (e) => {
    console.log("second listener on same button also fires");
});


// ─── removeEventListener ──────────────────────────────────────────────────────

// To remove a listener, you MUST pass the exact same function reference.
// Anonymous functions can't be removed — always name the handler if you plan to remove it.

const toggleBtn = document.getElementById("toggle-btn");
const output    = document.getElementById("toggle-output");

function handleToggle() {
    output.textContent = "Listener fired! (now removed)";
    console.log("toggle handler fired");
}

toggleBtn.addEventListener("click", handleToggle);

document.getElementById("remove-btn").addEventListener("click", () => {
    toggleBtn.removeEventListener("click", handleToggle);
    output.textContent = "Listener removed. Toggle button won't respond now.";
    console.log("listener removed from toggle-btn");
});


// ─── once option ──────────────────────────────────────────────────────────────

// { once: true } → listener fires exactly ONE time, then auto-removes itself.
// Same as calling removeEventListener inside the handler — just cleaner.

const onceBtn = document.getElementById("once-btn");

onceBtn.addEventListener("click", (e) => {
    document.getElementById("once-output").textContent = "Fired once! Click again — nothing happens.";
    console.log("once handler fired — auto-removed after this");
}, { once: true });


// ─── Common Event Types ───────────────────────────────────────────────────────

// keyboard events
document.getElementById("key-input").addEventListener("keydown", (e) => {
    console.log("keydown — key:", e.key, "| code:", e.code, "| ctrl:", e.ctrlKey);
    document.getElementById("key-output").textContent = `key: "${e.key}"  code: "${e.code}"`;
});

document.getElementById("key-input").addEventListener("input", (e) => {
    // "input" fires after every change — value is already updated
    console.log("input value now:", e.target.value);
});

// mouse events
const mouseBox = document.getElementById("mouse-box");

mouseBox.addEventListener("mouseenter", () => {
    mouseBox.style.borderColor = "#4f46e5";
    document.getElementById("mouse-output").textContent = "mouse entered";
});

mouseBox.addEventListener("mouseleave", () => {
    mouseBox.style.borderColor = "#2d3748";
    document.getElementById("mouse-output").textContent = "mouse left";
});

mouseBox.addEventListener("mousemove", (e) => {
    document.getElementById("mouse-output").textContent =
        `x: ${e.offsetX}  y: ${e.offsetY}`;
});


// ─── element.style ────────────────────────────────────────────────────────────

// element.style sets INLINE styles — highest specificity, overrides CSS classes.
// Property names are camelCase: background-color → backgroundColor

const styleBox = document.getElementById("style-box");

document.getElementById("style-red").addEventListener("click", () => {
    styleBox.style.backgroundColor = "#450a0a";
    styleBox.style.color           = "#f87171";
    styleBox.style.borderColor     = "#7f1d1d";
    styleBox.textContent           = "background: #450a0a";
});

document.getElementById("style-green").addEventListener("click", () => {
    styleBox.style.backgroundColor = "#14532d";
    styleBox.style.color           = "#4ade80";
    styleBox.style.borderColor     = "#15803d";
    styleBox.textContent           = "background: #14532d";
});

document.getElementById("style-reset").addEventListener("click", () => {
    // set to "" to remove inline style — falls back to CSS
    styleBox.style.backgroundColor = "";
    styleBox.style.color           = "";
    styleBox.style.borderColor     = "";
    styleBox.textContent           = "styles cleared";
});


// ─── element.classList ────────────────────────────────────────────────────────

// Managing CSS classes is cleaner than toggling inline styles.
// classList methods: add, remove, toggle, contains, replace

const classBox = document.getElementById("class-box");

document.getElementById("cls-add").addEventListener("click", () => {
    classBox.classList.add("box-active");
    document.getElementById("class-output").textContent =
        "classes: " + classBox.className;
    console.log("classList after add:", [...classBox.classList]);
});

document.getElementById("cls-remove").addEventListener("click", () => {
    classBox.classList.remove("box-active");
    document.getElementById("class-output").textContent =
        "classes: " + classBox.className;
});

document.getElementById("cls-toggle").addEventListener("click", () => {
    classBox.classList.toggle("box-highlight");
    document.getElementById("class-output").textContent =
        "classes: " + classBox.className;
    console.log("contains box-highlight:", classBox.classList.contains("box-highlight"));
});


// ─── Event Delegation ─────────────────────────────────────────────────────────

// Instead of adding a listener to every child, add ONE listener to the parent.
// Use event.target to know which child was clicked.
// Efficient — works even for elements added to the DOM after the listener is set.

const itemList = document.getElementById("delegate-list");

itemList.addEventListener("click", (e) => {
    const item = e.target.closest("li");
    if (!item) return;

    // deselect previous
    itemList.querySelectorAll("li").forEach(li => li.classList.remove("selected"));

    item.classList.add("selected");
    document.getElementById("delegate-output").textContent =
        "selected: " + item.textContent;
    console.log("delegated click on:", item.textContent);
});


// ─── Preventing Default Behavior ─────────────────────────────────────────────

document.getElementById("demo-form").addEventListener("submit", (e) => {
    e.preventDefault();   // stops the browser from reloading the page
    const val = document.getElementById("form-input").value.trim();
    document.getElementById("form-output").textContent =
        val ? `Submitted: "${val}"` : "Please enter something.";
    console.log("form submit prevented, value:", val);
});

// e.stopPropagation() — stops the event from bubbling up to parent elements
document.getElementById("inner-div").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("bubble-output").textContent = "inner div clicked (stopped bubbling)";
    console.log("inner clicked, propagation stopped");
});

document.getElementById("outer-div").addEventListener("click", () => {
    document.getElementById("bubble-output").textContent = "outer div clicked";
    console.log("outer clicked");
});