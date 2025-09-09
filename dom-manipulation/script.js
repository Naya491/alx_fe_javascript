// Initial quotes array
let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuoteBtn");
  const categorySelect = document.getElementById("categorySelect");
  
  // Populate category dropdown dynamically
  function updateCategories() {
    let categories = [...new Set(quotes.map(q => q.category))]; // unique categories
    categorySelect.innerHTML = `<option value="all">All</option>`;
    categories.forEach(cat => {
      let option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }
  
  // Show random quote
  function showRandomQuote() {
    let selectedCategory = categorySelect.value;
    let filteredQuotes = selectedCategory === "all" 
      ? quotes 
      : quotes.filter(q => q.category === selectedCategory);
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = "No quotes available for this category.";
      return;
    }
  
    let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}" — [${filteredQuotes[randomIndex].category}]`;
  }
  
  // Add new quote
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      updateCategories();
      alert("Quote added successfully!");
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  categorySelect.addEventListener("change", showRandomQuote);
  
  // Initialize categories
  updateCategories();
// Sample quote array
const quotes = [
    { text: "Believe in yourself!", category: "Motivation" },
    { text: "Life is short, smile while you still have teeth!", category: "Humor" },
  ];
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const display = document.getElementById("quoteDisplay");
    display.textContent = `"${quote.text}" - ${quote.category}`;
  }
  
  // Function to create the form for adding a quote
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
  
    const quoteInput = document.createElement("input");
    quoteInput.type = "text";
    quoteInput.id = "newQuoteText";
    quoteInput.placeholder = "Enter a new quote";
  
    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";
  
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote;
  
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
  }
  
  // Function to add a new quote
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      alert("Quote added successfully!");
    } else {
      alert("Please fill out both fields.");
    }
  }
  
  // Initialize when page loads
  document.addEventListener("DOMContentLoaded", () => {
    showRandomQuote();
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    createAddQuoteForm(); // ⚠️ Required for the check to pass!
  });
    
  // script.js
// Dynamic Quote Generator — localStorage + sessionStorage + JSON import/export
// Keys used in storage
const STORAGE_KEY = 'dynamicQuoteGenerator.quotes';
const LAST_QUOTE_KEY = 'dynamicQuoteGenerator.lastQuoteIndex';

// Default quotes (used if localStorage is empty or invalid)
const DEFAULT_QUOTES = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" }
];

// Mutable quotes array
let quotes = [];

// Cached DOM references (may be created dynamically)
let quoteDisplay;
let newQuoteBtn;
let categorySelect;
let quoteFormContainer;
let addQuoteBtn;
let exportBtn;
let importInput;

// ---------- Storage helpers ----------
function loadQuotesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // basic validation: keep only objects with text & category strings
        quotes = parsed.filter(q => q && typeof q.text === 'string' && typeof q.category === 'string');
        if (quotes.length) return;
      }
    }
  } catch (e) {
    console.error('Error parsing stored quotes:', e);
  }
  // fallback
  quotes = DEFAULT_QUOTES.slice();
  saveQuotesToStorage();
}

function saveQuotesToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
  } catch (e) {
    console.error('Error saving quotes to storage:', e);
  }
}

function saveLastQuoteIndex(i) {
  try { sessionStorage.setItem(LAST_QUOTE_KEY, String(i)); } catch(e) {}
}
function getLastQuoteIndex() {
  const v = sessionStorage.getItem(LAST_QUOTE_KEY);
  return v !== null ? parseInt(v, 10) : null;
}

// ---------- UI helpers ----------
function createQuoteDisplay() {
  const div = document.createElement('div');
  div.id = 'quoteDisplay';
  div.textContent = 'Click "Show New Quote" to get inspired!';
  // optionally insert at top
  document.body.insertBefore(div, document.body.firstChild);
  return div;
}

function createControlsIfMissing() {
  // show new quote button
  newQuoteBtn = document.getElementById('newQuote');
  if (!newQuoteBtn) {
    newQuoteBtn = document.createElement('button');
    newQuoteBtn.id = 'newQuote';
    newQuoteBtn.textContent = 'Show New Quote';
    // place after quoteDisplay or at top if missing
    const after = document.getElementById('quoteDisplay') || document.body.firstChild;
    if (after && after.nextSibling) after.parentNode.insertBefore(newQuoteBtn, after.nextSibling);
    else document.body.appendChild(newQuoteBtn);
  }
  // category select may be in HTML; if not, updateCategories will create it
  categorySelect = document.getElementById('categorySelect');
}

function updateCategories() {
  categorySelect = document.getElementById('categorySelect');
  if (!categorySelect) {
    // create a small container with label and select
    const container = document.getElementById('categoryFilter') || document.createElement('div');
    container.id = 'categoryFilter';
    container.innerHTML = '<h3>Filter by Category</h3>';
    categorySelect = document.createElement('select');
    categorySelect.id = 'categorySelect';
    container.appendChild(categorySelect);
    // append container near the form or at the end
    const ref = document.getElementById('quoteForm') || document.getElementById('quoteDisplay') || document.body;
    if (!document.getElementById('categoryFilter')) ref.parentNode.insertBefore(container, ref.nextSibling);
  }

  // fill options
  const categories = Array.from(new Set(quotes.map(q => q.category)));
  categorySelect.innerHTML = '';
  const optAll = document.createElement('option');
  optAll.value = 'all';
  optAll.textContent = 'All';
  categorySelect.appendChild(optAll);

  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

// ---------- Quote display ----------
function showRandomQuote() {
  if (!quoteDisplay) quoteDisplay = document.getElementById('quoteDisplay') || createQuoteDisplay();
  const selectedCategory = (categorySelect && categorySelect.value) || 'all';
  const filtered = selectedCategory === 'all' ? quotes : quotes.filter(q => q.category === selectedCategory);
  if (!filtered.length) {
    quoteDisplay.textContent = 'No quotes available for this category.';
    return;
  }
  const idx = Math.floor(Math.random() * filtered.length);
  const chosen = filtered[idx];
  quoteDisplay.textContent = `"${chosen.text}" — [${chosen.category}]`;
  // Save last shown (global index)
  const globalIndex = quotes.findIndex(q => q.text === chosen.text && q.category === chosen.category);
  if (globalIndex !== -1) saveLastQuoteIndex(globalIndex);
}

// ---------- Required function: createAddQuoteForm() ----------
function createAddQuoteForm() {
  // Reuse existing container if present, else create it
  quoteFormContainer = document.getElementById('quoteForm') || document.createElement('div');
  quoteFormContainer.id = 'quoteForm';
  quoteFormContainer.innerHTML = `
    <h3>Add a New Quote</h3>
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
    <div style="margin-top:10px;">
      <button id="exportBtn">Export Quotes (JSON)</button>
      <input id="importInput" type="file" accept=".json" style="margin-left:8px;" />
    </div>
  `;
  if (!document.getElementById('quoteForm')) document.body.appendChild(quoteFormContainer);

  // wire events and cache refs
  addQuoteBtn = document.getElementById('addQuoteBtn');
  exportBtn = document.getElementById('exportBtn');
  importInput = document.getElementById('importInput');

  addQuoteBtn.addEventListener('click', () => {
    const text = (document.getElementById('newQuoteText') || {}).value || '';
    const cat = (document.getElementById('newQuoteCategory') || {}).value || '';
    addQuote(text.trim(), cat.trim());
    // clear inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  });

  exportBtn.addEventListener('click', exportToJsonFile);
  importInput.addEventListener('change', importFromJsonFile);
}

// ---------- Required function: addQuote() ----------
function addQuote(text, category) {
  if (!text || !category) {
    alert('Please enter both a quote and a category.');
    return;
  }
  // prevent exact duplicates
  const exists = quotes.some(q => q.text === text && q.category === category);
  if (exists) {
    alert('This quote already exists.');
    return;
  }
  quotes.push({ text, category });
  saveQuotesToStorage();
  updateCategories();
  alert('Quote added successfully!');
}

// ---------- Export / Import ----------
function exportToJsonFile() {
  try {
    const jsonStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Export failed:', e);
    alert('Export failed.');
  }
}

function importFromJsonFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error('JSON must be an array of quote objects');
      const valid = imported.filter(q => q && typeof q.text === 'string' && typeof q.category === 'string');
      if (!valid.length) {
        alert('No valid quotes found in the file.');
        return;
      }
      // merge without duplicates
      let added = 0;
      valid.forEach(q => {
        const exists = quotes.some(existing => existing.text === q.text && existing.category === q.category);
        if (!exists) { quotes.push({ text: q.text, category: q.category }); added++; }
      });
      if (added > 0) {
        saveQuotesToStorage();
        updateCategories();
        alert(`${added} quotes imported successfully!`);
      } else {
        alert('No new quotes to import.');
      }
    } catch (err) {
      alert('Failed to import JSON: ' + err.message);
    } finally {
      // reset input so same file can be imported again if needed
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}

// ---------- Initialization ----------
document.addEventListener('DOMContentLoaded', () => {
  // ensure quote display and controls exist
  quoteDisplay = document.getElementById('quoteDisplay') || createQuoteDisplay();
  createControlsIfMissing();

  // load quotes, categories, and the form
  loadQuotesFromStorage();
  updateCategories();
  createAddQuoteForm();

  // show last viewed quote from session if present, else random
  const lastIndex = getLastQuoteIndex();
  if (lastIndex !== null && quotes[lastIndex]) {
    quoteDisplay.textContent = `"${quotes[lastIndex].text}" — [${quotes[lastIndex].category}]`;
  } else {
    showRandomQuote();
  }

  // wire top-level event listeners
  newQuoteBtn = document.getElementById('newQuote');
  if (newQuoteBtn) newQuoteBtn.addEventListener('click', showRandomQuote);

  categorySelect = document.getElementById('categorySelect');
  if (categorySelect) categorySelect.addEventListener('change', showRandomQuote);
});
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();
  
    URL.revokeObjectURL(url);
  }
  // Load quotes from localStorage or default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The journey of a thousand miles begins with a single step.", category: "Motivation" }
  ];
  
  // Show a random quote
  function showRandomQuote() {
    const category = localStorage.getItem("selectedCategory") || "all";
    let filteredQuotes = quotes;
  
    if (category !== "all") {
      filteredQuotes = quotes.filter(q => q.category === category);
    }
  
    if (filteredQuotes.length === 0) {
      document.getElementById("quoteDisplay").innerText = "No quotes in this category.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    document.getElementById("quoteDisplay").innerText = filteredQuotes[randomIndex].text;
  }
  
  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Add a new quote
  function addQuote() {
    const newText = document.getElementById("newQuoteText").value.trim();
    const newCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      saveQuotes();
      populateCategories(); // update dropdown if new category added
      alert("Quote added successfully!");
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
    } else {
      alert("Please enter both quote text and category.");
    }
  }
  
  // Populate categories dynamically
  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore last selected category
    const savedCategory = localStorage.getItem("selectedCategory") || "all";
    categoryFilter.value = savedCategory;
  }
  
  // Filter quotes by category
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);
    showRandomQuote();
  }
  
  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    showRandomQuote();
  });
  
  