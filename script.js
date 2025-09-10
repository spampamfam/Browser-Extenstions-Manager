//variables

const themeButton = document.getElementById("themeButton");
const bodyContainer = document.getElementById("body");
const themeIcon = document.getElementById("themeIcon");
const extensionContainer = document.getElementById("extensionContainer");
const checkboxes = extensionContainer.querySelectorAll(
  "input[type='checkbox']"
);
let saved;

function updateStorage(newArr) {
  localStorage.setItem("data", JSON.stringify(newArr));
  console.log(newArr);
  render(newArr);
}

function render(arr) {
  extensionContainer.innerHTML = "";
  arr.forEach((obj) => {
    addCards(obj);
  });
}

function isActive(obj) {
  const currentCheckbox = document.getElementById(`${obj.name}`);
  if (obj.isActive) {
    currentCheckbox.checked = obj.isActive;
  } else {
    return;
  }
}

function addCards(obj) {
  extensionContainer.insertAdjacentHTML(
    "beforeend",
    `
        <div class="card__container">
          <header class="card__header">
            <img src="${obj.logo}" class="card__logo" alt='${obj.nam} logo'/>
            <h2>${obj.name}</h2>
            <p>
              ${obj.description}
            </p>
          </header>
          <footer class="card__footer flex__container">
            <button type="button" class="remove__button button__label" data-extension='${obj.name}'>
              Remove
            </button>
            <label for="${obj.name}" class="toggle__button__label">
              <input type="checkbox" class="action__button" id="${obj.name}" />
            </label>
          </footer>
          `
  );
  isActive(obj);
}

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

window.addEventListener("load", () => {
  applyTheme(localStorage.getItem("currentTheme"));

  if (!localStorage.getItem("data")) {
    fetch("./data.json")
      .then((res) => {
        if (!res.ok) {
          console.log("problem");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
        data.forEach((obj) => {
          addCards(obj);
        });
      });
  } else {
    saved = JSON.parse(localStorage.getItem("data"));
    saved.forEach((obj) => {
      addCards(obj);
    });
  }
});

themeButton.addEventListener("click", toggleTheme);

extensionContainer.addEventListener("click", (e) => {
  let saved = JSON.parse(localStorage.getItem("data"));
  if (e.target.type === "checkbox") {
    let curr = saved.find((obj) => obj.name === e.target.id);
    curr.isActive = e.target.checked;
    updateStorage(saved);
  } else if (e.target.type === "button") {
    let cardName = e.target.dataset.extension;
    let curr = saved.find((obj) => obj.name === cardName);
    removeExtenstion(curr);
  }
});

function removeExtenstion(extension) {
  let arr = JSON.parse(localStorage.getItem("data"));
  let zby = arr.filter((curr) => {
    return curr.name != extension.name;
  });
  updateStorage(zby);
}
