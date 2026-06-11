// ─── DOM Basics ───────────────────────────────────────────────────────────────


// ─── What is an API? ──────────────────────────────────────────────────────────

// API = Application Programming Interface
// A set of rules that lets two systems talk to each other.
// In web dev, you deal with three kinds constantly:

// 1. Web APIs (over HTTP)
//    — External services you call over the network
//    — Example: fetch("https://api.github.com/users/ayush")
//    — Request → Response (JSON/XML)

// 2. Browser APIs (built into the browser)
//    — Interfaces the browser exposes to JS
//    — Examples:
//      DOM API       → document.getElementById(), querySelector()
//      Fetch API     → fetch(), Request, Response
//      Storage API   → localStorage, sessionStorage
//      Geolocation   → navigator.geolocation
//      Canvas API    → <canvas> drawing
//      Web Audio API → AudioContext
//    — No installation needed, always available in the browser

// 3. DOM API (a subset of Browser APIs)
//    — Specifically for reading and manipulating the HTML document
//    — The browser parses your HTML → builds a tree of nodes → DOM
//    — JS talks to that tree via the DOM API


// ─── The DOM Tree ─────────────────────────────────────────────────────────────

// When the browser loads index.html, it creates a tree like this:
//
//   document
//   └── <html>
//       ├── <head>
//       │   └── <title>
//       └── <body>
//           ├── <h1 id="page-title">
//           ├── <section id="selector-demo">
//           │   ├── <p class="api-note">
//           │   ├── <p class="api-note highlight">
//           │   └── <p class="api-note">
//           └── <section id="content-demo">
//               └── ...
//
// Every tag is a Node. JS can walk, read, and change this tree.


// ════════════════════════════════════════════════════════════════
// PART 1 — SELECTING ELEMENTS
// ════════════════════════════════════════════════════════════════


// ─── getElementById ───────────────────────────────────────────────────────────

// Selects ONE element by its exact id attribute.
// Fastest selector — id lookups are O(1) in the browser's internal hash map.
// Returns: the element, or null if not found.

const pageTitle = document.getElementById("page-title");
console.log("getElementById:", pageTitle);
console.log("tag name:", pageTitle.tagName);           // "H1"
console.log("id attr:", pageTitle.id);                 // "page-title"

// if id doesn't exist → null (not an error, but .anything on null will crash)
const ghost = document.getElementById("does-not-exist");
console.log("missing id:", ghost);                     // null
console.log("safe access:", ghost?.textContent);       // undefined (optional chaining)


// ─── querySelector ────────────────────────────────────────────────────────────

// Selects the FIRST element matching a CSS selector.
// Accepts any valid CSS selector — id, class, tag, attribute, pseudo, combinators.
// Returns: the element, or null if not found.

const firstNote    = document.querySelector(".api-note");          // first .api-note
const titleById    = document.querySelector("#page-title");        // by id
const firstSection = document.querySelector("section");            // by tag
const highlighted  = document.querySelector(".api-note.highlight"); // two classes
const inputEl      = document.querySelector("input[type='text']"); // attribute selector
const directChild  = document.querySelector("#selector-demo > p"); // combinator

console.log("querySelector .api-note:", firstNote);
console.log("querySelector #page-title:", titleById);
console.log("querySelector section:", firstSection);
console.log("querySelector .api-note.highlight:", highlighted);


// ─── querySelectorAll ─────────────────────────────────────────────────────────

// Selects ALL elements matching a CSS selector.
// Returns: a static NodeList — like an array but not a real Array.
// "Static" means it does NOT update if the DOM changes after the call.

const allNotes = document.querySelectorAll(".api-note");
console.log("querySelectorAll count:", allNotes.length);

// NodeList supports forEach directly
allNotes.forEach((el, index) => {
    console.log(`  note[${index}]:`, el.textContent.trim().slice(0, 40));
});

// NodeList does NOT have .map(), .filter() etc. — convert first
const noteTexts = Array.from(allNotes).map(el => el.textContent.trim());
console.log("note texts array:", noteTexts);

// spread also works
const noteArray = [...allNotes];
console.log("spread to array:", noteArray.length);


// ─── getElementById vs querySelector vs querySelectorAll ─────────────────────

// getElementById("#page-title")   ← WRONG  — no # for getElementById
// getElementById("page-title")    ← correct
// querySelector("#page-title")    ← correct — needs # like CSS
// querySelector(".api-note")      ← first match only
// querySelectorAll(".api-note")   ← all matches, returns NodeList

console.log("--- selector comparison ---");
console.log(document.getElementById("page-title") === document.querySelector("#page-title")); // true — same element


// ════════════════════════════════════════════════════════════════
// PART 2 — READING & WRITING CONTENT
// ════════════════════════════════════════════════════════════════

// Three properties for getting/setting content inside an element:
//   textContent   — raw text, ignores HTML tags
//   innerText     — visible text, CSS-aware
//   innerHTML     — full HTML markup as a string


// ─── textContent ──────────────────────────────────────────────────────────────

// Returns ALL text inside the element, including text inside hidden children.
// Strips all HTML tags — just the characters.
// Setting it escapes HTML entities automatically (safe from XSS).
// Fastest of the three — no layout calculation needed.

const demoBox = document.getElementById("textcontent-demo");
console.log("--- textContent ---");
console.log(demoBox.textContent);
// "Visible text  Hidden text  Bold text"  — includes hidden span

demoBox.textContent = "Reset by textContent";
// ⚠ This replaces ALL child nodes with a single text node
// Any <span>, <strong> etc. inside are gone


// ─── innerText ────────────────────────────────────────────────────────────────

// Returns only the VISIBLE text — respects CSS (display:none, visibility:hidden).
// Also respects whitespace and line breaks as rendered on screen.
// Slower than textContent — triggers a layout reflow to know what's visible.
// Good when you care about what the user actually sees.

const innerTextBox = document.getElementById("innertext-demo");
console.log("--- innerText ---");
console.log(innerTextBox.innerText);
// Does NOT include text inside display:none elements

// Note: innerText is not on SVG elements or inside <script>/<style> tags


// ─── innerHTML ────────────────────────────────────────────────────────────────

// Returns the full HTML markup inside the element as a string.
// Setting it parses the string as HTML and replaces the element's content.
// Powerful but has an XSS risk — never set innerHTML with raw user input.

const innerHTMLBox = document.getElementById("innerhtml-demo");
console.log("--- innerHTML ---");
console.log(innerHTMLBox.innerHTML);
// "<strong>Bold</strong> and <em>italic</em> and <span style=\"color:#818cf8\">colored</span>"

// write HTML via innerHTML
innerHTMLBox.innerHTML = `
    <span style="color:#4ade80">✓ Status:</span>
    <strong>API connected</strong>
    <code style="background:#1e293b;padding:2px 6px;border-radius:4px;font-size:0.8em">200 OK</code>
`;

// ⚠ XSS danger — never do this:
// const userInput = '<img src=x onerror="alert(1)">';
// el.innerHTML = userInput;   // executes script — BAD
// el.textContent = userInput; // safe — renders as text, not HTML


// ─── Side-by-side comparison ─────────────────────────────────────────────────

// Given this HTML:
// <div id="compare-box">
//   Hello <strong>World</strong>
//   <span style="display:none">Secret</span>
// </div>

const compareBox = document.getElementById("compare-box");

console.log("--- comparison on #compare-box ---");
console.log("textContent:", compareBox.textContent);
// "Hello World Secret"  — all text, includes hidden

console.log("innerText:  ", compareBox.innerText);
// "Hello World"  — only visible text, excludes display:none

console.log("innerHTML:  ", compareBox.innerHTML);
// 'Hello <strong>World</strong>\n   <span style="display:none">Secret</span>'

// Summary table (also shown in the HTML):
// ┌──────────────┬────────────────────────────┬──────────────┬────────────┐
// │              │ Returns hidden text?        │ Returns HTML?│ Speed      │
// ├──────────────┼────────────────────────────┼──────────────┼────────────┤
// │ textContent  │ YES                        │ NO           │ Fastest    │
// │ innerText    │ NO (CSS-aware)             │ NO           │ Slower     │
// │ innerHTML    │ YES                        │ YES          │ Medium     │
// └──────────────┴────────────────────────────┴──────────────┴────────────┘

// When to use which:
// textContent → reading/writing plain text, no HTML needed (most common)
// innerText   → when you need what the user actually sees on screen
// innerHTML   → when you need to inject or read HTML structure


// ─── Live demo buttons ────────────────────────────────────────────────────────

document.getElementById("btn-textcontent")?.addEventListener("click", () => {
    const out = document.getElementById("live-output");
    out.textContent = compareBox.textContent;
    document.getElementById("live-label").textContent = "textContent";
});

document.getElementById("btn-innertext")?.addEventListener("click", () => {
    const out = document.getElementById("live-output");
    out.textContent = compareBox.innerText;
    document.getElementById("live-label").textContent = "innerText";
});

document.getElementById("btn-innerhtml")?.addEventListener("click", () => {
    const out = document.getElementById("live-output");
    out.textContent = compareBox.innerHTML;
    document.getElementById("live-label").textContent = "innerHTML";
});


// ════════════════════════════════════════════════════════════════
// PART 3 — CREATING & REMOVING ELEMENTS
// ════════════════════════════════════════════════════════════════


// ─── appendChild ──────────────────────────────────────────────────────────────

// Adds a node as the LAST child of a parent element.
// If the node already exists in the DOM, it gets MOVED (not copied).

const list = document.getElementById("demo-list");

// create a new <li> and append it
const newItem = document.createElement("li");
newItem.textContent = "Item added via appendChild";
list.appendChild(newItem);

// create and append multiple items
["Spring Boot", "React", "PostgreSQL"].forEach(tech => {
    const li = document.createElement("li");
    li.textContent = tech;
    list.appendChild(li);
});

console.log("list children after appendChild:", list.children.length);


// ─── removeChild ──────────────────────────────────────────────────────────────

// Removes a specific child node from its parent.
// Returns the removed node — you can re-insert it elsewhere.

const firstItem = list.querySelector("li");
const removed = list.removeChild(firstItem);
console.log("removed:", removed.textContent);

// modern alternative — element.remove() (no need to reference parent)
// list.lastElementChild.remove();


// ─── setAttribute ─────────────────────────────────────────────────────────────

// setAttribute(name, value) — sets or updates any attribute on an element.
// Works for standard attributes (href, src, id, class) and custom ones too.

const link = document.getElementById("demo-link");

link.setAttribute("href", "https://developer.mozilla.org");
link.setAttribute("target", "_blank");
link.setAttribute("data-source", "mdn");

console.log("href:", link.getAttribute("href"));
console.log("data-source:", link.getAttribute("data-source"));
console.log("has target?", link.hasAttribute("target"));   // true

link.removeAttribute("target");
console.log("has target after remove?", link.hasAttribute("target")); // false

// for class and id, direct property access is cleaner than setAttribute
// link.setAttribute("class", "active")  → link.className = "active"
// link.setAttribute("id", "new-id")     → link.id = "new-id"


// ════════════════════════════════════════════════════════════════
// PART 4 — BROWSER INTERFACES
// ════════════════════════════════════════════════════════════════


// ─── navigator interface ──────────────────────────────────────────────────────

// window.navigator — info about the browser and user's environment
// Commonly used for: device detection, geolocation, online status, clipboard

console.log("--- navigator ---");
console.log("browser name+version:", navigator.userAgent);
console.log("platform:", navigator.platform);
console.log("language:", navigator.language);           // "en-US"
console.log("online:", navigator.onLine);               // true/false
console.log("cookiesEnabled:", navigator.cookieEnabled);
console.log("cpu cores:", navigator.hardwareConcurrency);

// geolocation — ask user permission, then get lat/lng
// navigator.geolocation.getCurrentPosition(
//     pos => console.log(pos.coords.latitude, pos.coords.longitude),
//     err => console.log("denied:", err.message)
// );

// clipboard — read/write clipboard (requires user gesture + permission)
// navigator.clipboard.writeText("copied!")
//     .then(() => console.log("copied to clipboard"));


// ─── window interface ─────────────────────────────────────────────────────────

// window is the global object in the browser.
// All global variables and functions are properties of window.
// You rarely need to write "window." — it's implicit.

console.log("--- window ---");
console.log("viewport width:", window.innerWidth);
console.log("viewport height:", window.innerHeight);
console.log("full screen width:", window.screen.width);
console.log("full screen height:", window.screen.height);
console.log("scroll position Y:", window.scrollY);
console.log("scroll position X:", window.scrollX);
console.log("origin:", window.location.origin);
console.log("pathname:", window.location.pathname);
console.log("protocol:", window.location.protocol);

// window.history — go back/forward in browser history
// window.history.back();
// window.history.forward();
// window.history.pushState({}, "", "/new-path");  // change URL without reload

// window timing functions (these are window methods, no "window." needed)
// setTimeout(fn, ms)   — run once after delay
// setInterval(fn, ms)  — run repeatedly
// clearTimeout(id)
// clearInterval(id)


// ─── document interface ───────────────────────────────────────────────────────

// document is the entry point to the DOM tree.
// It represents the entire HTML page.

console.log("--- document ---");
console.log("title:", document.title);
console.log("URL:", document.URL);
console.log("domain:", document.domain);
console.log("ready state:", document.readyState);   // "loading" | "interactive" | "complete"
console.log("charset:", document.characterSet);
console.log("html element:", document.documentElement);  // <html>
console.log("head:", document.head);
console.log("body:", document.body);

// useful document methods
console.log("active element:", document.activeElement);  // focused element
console.log("all forms:", document.forms.length);
console.log("all images:", document.images.length);
console.log("all links:", document.links.length);

// document.cookie — read/write cookies (string-based, a bit clunky)
// document.cookie = "theme=dark; path=/";
// console.log(document.cookie);
