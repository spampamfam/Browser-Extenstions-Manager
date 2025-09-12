Browser Extensions Manager UI

This is a Vanilla JavaScript front-end project I built to practice working with JSON data, DOM manipulation, and responsive design.
It simulates a browser extensions manager where users can toggle themes, filter extensions, and manage their states — all powered by data from a data.json file.

🚀 Features

Theme Toggle
Switch between light 🌞 and dark 🌙 themes with a single button.

Extensions List

Dynamically rendered cards for each extension.

Show All, Active, or Inactive extensions.

Toggle extension state or remove extensions.

Reset Simulation
A reset dialog lets you restart the simulation with two options:

✅ Yes (Hell Yeahhh) → Reloads simulation.

❌ No (boring) → Keeps the current state.

Responsive Design

3-column layout on large screens.

2-column layout on medium screens.

1-column layout on small/mobile screens.

📂 Project Structure
.
├── index.html # Main UI structure
├── styles.css # Theme and layout styling
├── script.js # App logic (fetching, rendering, localStorage)
├── data.json # Mock extension data (must exist locally)
└── assets/
└── images/ # Logos, icons (favicon, moon/sun theme icons, etc.)

🛠️ Tech Stack

HTML5 (semantic structure)

CSS3 (flexbox + grid + responsive design + themes)

JavaScript (ES6) (DOM manipulation, localStorage, fetch API)

JSON (data-driven rendering)

📱 Responsiveness

Desktop → 3 columns.

Tablet → 2 columns.

Mobile → 1 column, stacked layout.

🎨 Preview

(Add a screenshot or GIF here once you run the project for better visualization)

🧩 Future Improvements

Add animations when toggling/removing extensions.

Sync with real browser extension APIs.

Add search functionality to quickly find extensions.
