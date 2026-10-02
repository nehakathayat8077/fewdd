# 🌍 World Atlas

A beginner-friendly website that teaches HTML, CSS and JavaScript by
building something real: a small interactive atlas of world countries.

It was made for two audiences at once:
- **Students**, who can explore country facts, take a geography quiz,
  and play with a live box-model demo.
- **Teachers**, who can see exactly where each syllabus topic is used,
  via the built-in "Learning Map" section.

---

## ✨ Features

- Searchable, filterable, sortable table of country facts (ascending
  and descending, by name or population)
- Flag images with a graceful fallback if they fail to load
- An embedded second page ("Fact of the Day") shown via `<iframe>`
- A 5-question geography quiz with instant feedback and a final score
- A contact/feedback form with live JavaScript validation
- Fully responsive: the layout adapts for phones, tablets and desktops
- A "Learning Map" table pointing out exactly which file and feature
  demonstrates every syllabus topic

---

## 📁 File structure

```
world-atlas/
├── index.html            Main page: header, nav, home, atlas, learning
│                          map, quiz, about, and contact sections
├── styles.css             All visual styling (colours, fonts, layout,
│                          responsiveness), heavily commented
├── script.js              All interactivity: search, filter, sort,
│                          quiz logic, form validation
├── fact-of-the-day.html   A small standalone page, shown inside
│                          index.html using an <iframe>
└── README.md              This file
```

No build tools, frameworks, or installs are required — it's plain
HTML, CSS and JavaScript.

---

## ▶️ How to run it

1. Download all files into **one folder**, keeping their names exactly
   as they are (this matters — the files link to each other by name).
2. Double-click `index.html`. It opens straight in your browser.
3. An internet connection is needed only for two small extras: the
   Google Fonts and the flag images. Everything else works offline.

No server, terminal, or installation is needed.

---

## 📚 Syllabus coverage

| Unit | Topic | Where it's demonstrated |
|---|---|---|
| 1 | Internet & web design basics | "How the web works" section |
| 1 | Web architecture | HTML + CSS + JS diagram |
| 2 | HTML pages, lists, links, tables, forms, images, frames | Throughout `index.html`; iframe in the Atlas section |
| 3 | Stylesheets, selectors, cascade, box model, IDs/classes | Commented sections in `styles.css`; Box Model Playground |
| 4 | DOM, variables, functions, events, program flow, built-ins, form validation | Commented sections in `script.js` |

A full, topic-by-topic checklist is also built into the website itself
— see the **Learning Map** section when you open `index.html`.

---

## ⚠️ Limitations to check before classroom use

- Country population and area figures are recent approximate
  estimates, not live data — a teacher may want to verify them.
- Flag images load from a third-party service (flagcdn.com); if a
  school network blocks external images, flags will show a fallback
  badge instead of breaking the page.
- The contact form does not send real emails — it only demonstrates
  form validation.

---

Made for learning. Every file here is meant to be opened, read, and
changed — that's the best way to understand how it all fits together.
