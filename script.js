/* =================================================================
   WORLD ATLAS - script.js
   =================================================================
   This file gives the HTML its BEHAVIOUR: it reacts to clicks and
   typing, changes what is on screen, checks the form, and runs the
   quiz. Everything here works with the DOM (Document Object Model) -
   JavaScript's live map of every element on the page.

   The file is organised into clearly labelled parts:
     1. Data (variables & data types)
     2. Atlas: render, search, filter, sort
     3. Box model playground
     4. Quiz
     5. Contact form validation
     6. Small footer touches + menu toggle
   ================================================================= */

/* -----------------------------------------------------------------
   1. DATA: VARIABLES AND DATA TYPES
   -----------------------------------------------------------------
   const  -> a variable that will not be reassigned (the array itself
             can still have its contents used/read, just not replaced)
   let    -> a variable that IS expected to change later
   Below we use several JavaScript data types together:
     string   "India"
     number   1428600000
     array    [ ... ]
     object   { name: "India", population: 1428600000 }
   ----------------------------------------------------------------- */
const countries = [
  { name: "India", continent: "Asia", capital: "New Delhi", population: 1428627663, area: 3287263, flag: "in", fact: "India is home to more than 20 official languages." },
  { name: "China", continent: "Asia", capital: "Beijing", population: 1425671352, area: 9596960, flag: "cn", fact: "The Great Wall of China is thousands of kilometres long." },
  { name: "Japan", continent: "Asia", capital: "Tokyo", population: 123294513, area: 377975, flag: "jp", fact: "Japan is made up of more than 6,800 islands." },
  { name: "Nigeria", continent: "Africa", capital: "Abuja", population: 223804632, area: 923768, flag: "ng", fact: "Nigeria is the most populous country in Africa." },
  { name: "Egypt", continent: "Africa", capital: "Cairo", population: 112716598, area: 1002450, flag: "eg", fact: "The Great Pyramid of Giza stood as the tallest structure on Earth for over 3,800 years." },
  { name: "Kenya", continent: "Africa", capital: "Nairobi", population: 55100586, area: 580367, flag: "ke", fact: "Kenya's Great Rift Valley is visible from space." },
  { name: "Germany", continent: "Europe", capital: "Berlin", population: 83294633, area: 357022, flag: "de", fact: "Germany has over 1,500 different types of sausage." },
  { name: "France", continent: "Europe", capital: "Paris", population: 68170228, area: 551695, flag: "fr", fact: "France is the most visited country in the world by tourists." },
  { name: "Iceland", continent: "Europe", capital: "Reykjavik", population: 375318, area: 103000, flag: "is", fact: "Iceland has no mosquitoes." },
  { name: "United States", continent: "North America", capital: "Washington, D.C.", population: 341814420, area: 9833517, flag: "us", fact: "The USA has more time zones than any country except France and Russia." },
  { name: "Canada", continent: "North America", capital: "Ottawa", population: 39566248, area: 9984670, flag: "ca", fact: "Canada has the longest coastline of any country in the world." },
  { name: "Mexico", continent: "North America", capital: "Mexico City", population: 128455567, area: 1964375, flag: "mx", fact: "Mexico introduced chocolate, corn and chili peppers to the world." },
  { name: "Brazil", continent: "South America", capital: "Brasilia", population: 216422446, area: 8515767, flag: "br", fact: "The Amazon Rainforest produces about 20% of the world's oxygen." },
  { name: "Argentina", continent: "South America", capital: "Buenos Aires", population: 45538401, area: 2780400, flag: "ar", fact: "Argentina is home to the widest avenue in the world." },
  { name: "Peru", continent: "South America", capital: "Lima", population: 34352719, area: 1285216, flag: "pe", fact: "Machu Picchu was never found by the Spanish conquistadors." },
  { name: "Australia", continent: "Oceania", capital: "Canberra", population: 26439111, area: 7692024, flag: "au", fact: "Australia is the only continent that is also a single country." },
  { name: "New Zealand", continent: "Oceania", capital: "Wellington", population: 5228100, area: 270467, flag: "nz", fact: "New Zealand was one of the last major landmasses to be settled by humans." },
  { name: "Fiji", continent: "Oceania", capital: "Suva", population: 936375, area: 18274, flag: "fj", fact: "Fiji is made up of more than 330 islands." }
];

/* Track the CURRENT state of the atlas controls in one place. Keeping
   this in a plain object (rather than scattered separate variables)
   makes it easy to re-run the same "apply everything" logic whenever
   any control changes. */
const atlasState = {
  search: "",
  continent: "all",
  sortField: "name",
  sortAscending: true
};

/* -----------------------------------------------------------------
   2. ATLAS: RENDER, SEARCH, FILTER, SORT
   ----------------------------------------------------------------- */

// document.getElementById / querySelector are the two most common
// ways to reach into the DOM and grab a reference to one element.
const tbody = document.getElementById("atlas-tbody");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("search-input");
const continentFilter = document.getElementById("continent-filter");
const sortField = document.getElementById("sort-field");
const sortDirectionBtn = document.getElementById("sort-direction-btn");
const sortDirectionLabel = document.getElementById("sort-direction-label");
const sortDirectionArrow = document.getElementById("sort-direction-arrow");

// FUNCTION: builds the list of continent options for the filter
// dropdown automatically, instead of typing them out by hand in HTML.
function populateContinentFilter() {
  // Array.prototype.map() is a built-in ARRAY METHOD: it turns one
  // array (countries) into a new array (just the continent names).
  const allContinents = countries.map(function (country) {
    return country.continent;
  });
  // A Set is a built-in JavaScript object that only keeps UNIQUE
  // values - a quick way to remove duplicate continent names.
  const uniqueContinents = Array.from(new Set(allContinents)).sort();

  uniqueContinents.forEach(function (continent) {
    const option = document.createElement("option");
    option.value = continent;
    option.textContent = continent;
    continentFilter.appendChild(option);
  });
}


function getFilteredCountries() {
  return countries.filter(function (country) {
    
    const matchesSearch =
      country.name.toLowerCase().includes(atlasState.search) ||
      country.continent.toLowerCase().includes(atlasState.search);
    const matchesContinent =
      atlasState.continent === "all" || country.continent === atlasState.continent;
    return matchesSearch && matchesContinent;
  });
}


function sortCountries(list) {
  const field = atlasState.sortField;
  const direction = atlasState.sortAscending ? 1 : -1;

  // .slice() copies the array first, so we never sort the original
  // "countries" array in place - a good habit that avoids surprises.
  return list.slice().sort(function (a, b) {
    let result;
    if (typeof a[field] === "string") {
      // localeCompare correctly compares text, including capital
      // letters and accents, better than a plain < or > comparison.
      result = a[field].localeCompare(b[field]);
    } else {
      // Ternary operator (condition ? ifTrue : ifFalse) - a compact
      // form of an if/else used to compare two numbers.
      result = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
    }
    return result * direction; // flips the order for "descending"
  });
}

// FUNCTION: redraws the whole table body based on the current state.
function renderTable() {
  const filtered = getFilteredCountries();
  const sorted = sortCountries(filtered);

  // Clear out any rows from the previous render before adding new ones.
  tbody.innerHTML = "";

  if (sorted.length === 0) {
    resultCount.textContent = "No countries match your search yet - try a different word.";
  } else {
    // Template literals (backticks) let us mix text and variables
    // easily, and the ternary below picks singular vs plural wording.
    resultCount.textContent =
      sorted.length === countries.length
        ? "Showing all " + sorted.length + " countries."
        : `Showing ${sorted.length} of ${countries.length} countries.`;
  }

  // A basic "for...of" loop (program flow): runs the code once for
  // every country left after filtering and sorting.
  for (const country of sorted) {
    const row = document.createElement("tr");

    const flagCell = document.createElement("td");
    flagCell.setAttribute("data-label", "Flag");
    // Real <img> element, with a graceful fallback: if the flag image
    // fails to load (for example, no internet connection), the
    // onerror event swaps it for a small text badge instead.
    flagCell.innerHTML =
      `<img class="flag-img" src="https://flagcdn.com/w80/${country.flag}.png" ` +
      `alt="Flag of ${country.name}" ` +
      `onerror="this.outerHTML='<span class=&quot;flag-fallback&quot;>' + '${country.flag.toUpperCase()}' + '</span>';">`;

    row.appendChild(flagCell);
    row.appendChild(makeCell(country.name, "Country"));
    row.appendChild(makeCell(country.continent, "Continent"));
    row.appendChild(makeCell(country.capital, "Capital"));
   
    row.appendChild(makeCell(country.population.toLocaleString(), "Population"));
    row.appendChild(makeCell(country.area.toLocaleString(), "Area (km\u00B2)"));
    row.appendChild(makeCell(country.fact, "Did you know?"));

    tbody.appendChild(row);
  }
}


function makeCell(text, label) {
  const cell = document.createElement("td");
  cell.textContent = text;
  cell.setAttribute("data-label", label); // used by the responsive CSS
  return cell;
}


searchInput.addEventListener("input", function (event) {
  atlasState.search = event.target.value.toLowerCase();
  renderTable();
});

continentFilter.addEventListener("change", function (event) {
  atlasState.continent = event.target.value;
  renderTable();
});

sortField.addEventListener("change", function (event) {
  atlasState.sortField = event.target.value;
  renderTable();
});

sortDirectionBtn.addEventListener("click", function () {
  // ! (logical NOT) flips a boolean: true becomes false, false becomes true.
  atlasState.sortAscending = !atlasState.sortAscending;
  sortDirectionLabel.textContent = atlasState.sortAscending ? "Ascending" : "Descending";
  sortDirectionArrow.textContent = atlasState.sortAscending ? "\u2191" : "\u2193";
  sortDirectionBtn.setAttribute("aria-pressed", String(!atlasState.sortAscending));
  renderTable();
});


const quizQuestions = [
  { question: "Which is the largest continent by area?", options: ["Africa", "Asia", "Europe", "Antarctica"], answer: 1, explanation: "Asia covers about 30% of Earth's land area." },
  { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3, explanation: "The Pacific Ocean is bigger than all the continents combined." },
  { question: "The Sahara, the world's largest hot desert, is on which continent?", options: ["Africa", "Asia", "Australia", "South America"], answer: 0, explanation: "The Sahara Desert stretches across most of North Africa." },
  { question: "Which country has the largest population in the world (as of recent counts)?", options: ["United States", "China", "India", "Indonesia"], answer: 2, explanation: "India recently became the world's most populous country." },
  { question: "Mount Everest, Earth's highest mountain, sits on the border of Nepal and which other country/region?", options: ["Bhutan", "Tibet (China)", "Pakistan", "Myanmar"], answer: 1, explanation: "Mount Everest sits on the Nepal-Tibet (China) border." }
];

let quizIndex = 0;
let quizScore = 0;

const quizQuestionEl = document.getElementById("quiz-question");
const quizOptionsEl = document.getElementById("quiz-options");
const quizProgressEl = document.getElementById("quiz-progress");
const quizFeedbackEl = document.getElementById("quiz-feedback");
const quizNextBtn = document.getElementById("quiz-next");
const quizRestartBtn = document.getElementById("quiz-restart");

function loadQuizQuestion() {
  const current = quizQuestions[quizIndex];
  quizProgressEl.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length} \u00B7 Score: ${quizScore}`;
  quizQuestionEl.textContent = current.question;
  quizFeedbackEl.textContent = "";
  quizNextBtn.disabled = true;
  quizOptionsEl.innerHTML = "";

  current.options.forEach(function (optionText, optionIndex) {
    const optionBtn = document.createElement("button");
    optionBtn.type = "button";
    optionBtn.textContent = optionText;
    optionBtn.addEventListener("click", function () {
      handleQuizAnswer(optionIndex);
    });
    quizOptionsEl.appendChild(optionBtn);
  });
}

function handleQuizAnswer(chosenIndex) {
  const current = quizQuestions[quizIndex];
  const buttons = quizOptionsEl.querySelectorAll("button");

  buttons.forEach(function (button, index) {
    button.disabled = true;
    if (index === current.answer) {
      button.classList.add("correct");
    } else if (index === chosenIndex) {
      button.classList.add("incorrect");
    }
  });

  if (chosenIndex === current.answer) {
    quizScore = quizScore + 1; // could also be written quizScore += 1;
    quizFeedbackEl.textContent = "Correct! " + current.explanation;
  } else {
    quizFeedbackEl.textContent = "Not quite. " + current.explanation;
  }

  quizProgressEl.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length} \u00B7 Score: ${quizScore}`;
  quizNextBtn.disabled = false;

  if (quizIndex === quizQuestions.length - 1) {C
    quizNextBtn.hidden = true;
    quizRestartBtn.hidden = false;
  }
}

quizNextBtn.addEventListener("click", function () {
  quizIndex = quizIndex + 1;
  loadQuizQuestion();
});

quizRestartBtn.addEventListener("click", function () {
  quizIndex = 0;
  quizScore = 0;
  quizNextBtn.hidden = false;
  quizRestartBtn.hidden = true;
  loadQuizQuestion();
});


const feedbackForm = document.getElementById("feedback-form");
const successMessage = document.getElementById("form-success");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showFieldError(inputId, errorId, message) {
  document.getElementById(inputId).closest(".form-row").classList.add("invalid");
  document.getElementById(errorId).textContent = message;
}

function clearFieldError(inputId, errorId) {
  document.getElementById(inputId).closest(".form-row").classList.remove("invalid");
  document.getElementById(errorId).textContent = "";
}

function validateForm() {
  let isValid = true; 

  const name = document.getElementById("fb-name").value.trim();
  const email = document.getElementById("fb-email").value.trim();
  const continent = document.getElementById("fb-continent").value;
  const message = document.getElementById("fb-message").value.trim();

 
  if (name.length < 2) {
    showFieldError("fb-name", "fb-name-error", "Please enter your name (at least 2 letters).");
    isValid = false;
  } else {
    clearFieldError("fb-name", "fb-name-error");
  }

  if (!emailPattern.test(email)) {
    showFieldError("fb-email", "fb-email-error", "Please enter a valid email address, like name@example.com.");
    isValid = false;
  } else {
    clearFieldError("fb-email", "fb-email-error");
  }

  if (continent === "") {
    showFieldError("fb-continent", "fb-continent-error", "Please choose a continent.");
    isValid = false;
  } else {
    clearFieldError("fb-continent", "fb-continent-error");
  }

  if (message.length < 10) {
    showFieldError("fb-message", "fb-message-error", "Please write at least 10 characters of feedback.");
    isValid = false;
  } else {
    clearFieldError("fb-message", "fb-message-error");
  }

  return isValid;
}

feedbackForm.addEventListener("submit", function (event) {
  event.preventDefault(); 
  successMessage.textContent = "";

  if (validateForm()) {
    successMessage.textContent = "Thank you! Your feedback has been received (this demo does not send real emails).";
    feedbackForm.reset();
  }
});


document.getElementById("footer-year").textContent =
  "World Atlas \u00B7 a beginner web-design project \u00B7 " + new Date().getFullYear();

const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");
navToggle.addEventListener("click", function () {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});


populateContinentFilter();
renderTable();
loadQuizQuestion();
updateBoxModelDemo();
