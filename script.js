//variables

const themeButton = document.getElementById("themeButton");
const bodyContainer = document.getElementById("body");
const themeIcon = document.getElementById("themeIcon");
const extensionContainer = document.getElementById("extensionContainer");

function applyTheme(theme) {
  if (!theme) {
    theme = "light";
  }
  if (theme === "light") {
    bodyContainer.classList.toggle("light__theme", true);
    bodyContainer.classList.toggle("dark__theme", false);
  } else {
    bodyContainer.classList.toggle("dark__theme", true);
    bodyContainer.classList.toggle("light__theme", false);
  }
}

function toggleTheme() {
  let currentTheme = localStorage.getItem("currentTheme");
  if (currentTheme === "light") {
    bodyContainer.classList.toggle("dark__theme", true);
    bodyContainer.classList.toggle("light__theme", false);
    themeIcon.src = "./assets/images/icon-sun.svg";
    localStorage.setItem("currentTheme", "dark");
  } else {
    bodyContainer.classList.toggle("light__theme", true);
    bodyContainer.classList.toggle("dark__theme", false);
    themeIcon.src = "./assets/images/icon-moon.svg";
    localStorage.setItem("currentTheme", "light");
  }
}

fetch("./data.json")
  .then((res) => {
    if (!res.ok) {
      console.log("problem");
      return;
    }
    return res.json();
  })
  .then((data) => {
    data.forEach((obj) => {
      extensionContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card__container">
          <header class="card__header">
            <img src="${obj.logo}" class="card__logo" />
            <h2>${obj.name}</h2>
            <p>
              ${obj.description}
            </p>
          </header>
          <footer class="card__footer flex__container">
            <button type="button" class="remove__button button__label">
              Remove
            </button>
            <label for="${obj.name}" class="toggle__button__label">
              <input type="checkbox" class="action__button" id="${obj.name}" />
            </label>
          </footer>
          `
      );
    });
  });

window.addEventListener("load", () => {
  applyTheme(localStorage.getItem("currentTheme"));
});
themeButton.addEventListener("click", toggleTheme);

/*
<div class="card__container">
          <header class="card__header">
            <img src="./assets/images/logo-devlens.svg" class="card__logo" />
            <h2>Devlens</h2>
            <p>
              Quickly inspect page layouts and visualize element boundaries.
            </p>
          </header>
          <footer class="card__footer flex__container">
            <button type="button" class="remove__button button__label">
              Remove
            </button>
            <label for="toggleBtn" class="toggle__button__label">
              <input type="checkbox" class="action__button" id="toggleBtn" />
            </label>
          </footer>
          */
