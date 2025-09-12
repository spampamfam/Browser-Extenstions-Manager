//variables

const themeButton = document.getElementById("themeButton");
const bodyContainer = document.getElementById("body");
const themeIcon = document.getElementById("themeIcon");
const extensionContainer = document.getElementById("extensionContainer");
const resetContainer = document.getElementById("resetContainer");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const allFilterBtn = document.getElementById("allFilter");
const activeFilterBtn = document.getElementById("activeFilter");
const inActiveFilterBtn = document.getElementById("inActiveFilter");
const noExtension = document.getElementById("noExtension");

let saved;

function fetchData() {
  fetch("./data.json")
    .then((res) => {
      if (!res.ok) {
        console.log("problem with fetching data");
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("data", JSON.stringify(data));

      updateStorage(data); //going to updateStorage to update the storage
    });
}

function updateStorage(newArr) {
  localStorage.setItem("data", JSON.stringify(newArr));
  render(newArr);
}

function render(newArr) {
  let children = extensionContainer.querySelectorAll(".card__container");

  let domMap = {};
  children.forEach((node) => {
    const id = node.dataset.id;
    domMap[id] = node;
  });

  Object.values(domMap).forEach((node) => {
    if (!newArr.some((obj) => obj.name === node.dataset.id)) {
      node.remove();
    } else {
    }
  });
  const result = newArr.filter((obj) => !domMap[obj.name]);
  addCards(result);
  if (newArr.length <= 0) {
    extensionContainer.classList.toggle("hidden", true);
    resetContainer.classList.toggle("hidden", false);
  }
}

function addCards(extensions) {
  extensions.forEach((extension) => {
    extensionContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card__container" data-id='${extension.name}'>
          <header class="card__header">
            <img src="${extension.logo}" class="card__logo" alt='${extension.nam} logo'/>
            <h2>${extension.name}</h2>
            <p>
              ${extension.description}
            </p>
          </header>
          <footer class="card__footer flex__container">
            <button type="button" class="remove__button button__label" data-extension='${extension.name}'>
              Remove
            </button>
            <label for="${extension.name}" class="toggle__button__label">
              <input type="checkbox" class="action__button" id="${extension.name}" />
            </label>
          </footer>
          `
    );
    isActive(extension);
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

// function isEmptyInactive(child, arr) {
//   if (child == arr.length) {
//     noExtension.innerText = "There's no extensions here";
//   } else {
//     noExtension.innerText = "";
//   }
// }

// function isEmptyActive(child, arr) {
//   if ((child = arr.length)) {
//     noExtension.innerText = "";
//   } else {
//     noExtension.innerText = "There's no extensions here";
//   }
// }

function activeFilter() {
  let arg = JSON.parse(localStorage.getItem("data"));

  allFilter();
  arg.forEach((obj) => {
    if (!obj.isActive) {
      const currentCard = document.querySelector(`[data-id="${obj.name}"]`);
      console.log({ currentCard });
      currentCard.classList.toggle("hidden", true);
    } else {
      return;
    }
  });
}

function inActiveFilter() {
  let arg = JSON.parse(localStorage.getItem("data"));

  allFilter();
  arg.forEach((obj) => {
    if (obj.isActive) {
      const currentCard = document.querySelector(`[data-id="${obj.name}"]`);
      currentCard.classList.toggle("hidden", true);
    } else {
      return;
    }
  });
}

function allFilter() {
  let arg = JSON.parse(localStorage.getItem("data"));
  arg.forEach((obj) => {
    const currentCard = document.querySelector(`[data-id="${obj.name}"]`);
    currentCard.classList.toggle("hidden", false);
  });
}

function themeStorageHandler() {
  if (!localStorage.getItem("currentTheme")) {
    localStorage.setItem("currentTheme", "light");
    toggleTheme(localStorage.getItem("currentTheme"));
  } else {
    toggleTheme(localStorage.getItem("currentTheme"));
  }
}

function startupTheme(currentTheme) {
  if (currentTheme === "light") {
    bodyContainer.classList.toggle("light__theme", true);
    bodyContainer.classList.toggle("dark__theme", false);
    themeIcon.src = "./assets/images/icon-moon.svg";
  } else if (currentTheme === "dark") {
    bodyContainer.classList.toggle("dark__theme", true);
    bodyContainer.classList.toggle("light__theme", false);
    themeIcon.src = "./assets/images/icon-sun.svg";
  } else if (!currentTheme) {
    bodyContainer.classList.toggle("light__theme", true);
    bodyContainer.classList.toggle("dark__theme", false);
    themeIcon.src = "./assets/images/icon-moon.svg";
    localStorage.setItem("currentTheme", "light");
  }
}

function toggleTheme(currentTheme) {
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

function removeExtension(extension) {
  let arr = JSON.parse(localStorage.getItem("data"));
  let last = arr.filter((curr) => {
    return curr.name != extension.name;
  });
  updateStorage(last);
}

window.addEventListener("load", () => {
  startupTheme(localStorage.getItem("currentTheme"));
  if (!localStorage.getItem("data")) {
    fetchData();
  } else {
    let data = JSON.parse(localStorage.getItem("data"));

    updateStorage(data); //going to updateStorage to update the storage
  }
});

themeButton.addEventListener("click", () => {
  toggleTheme(localStorage.getItem("currentTheme"));
});

extensionContainer.addEventListener("click", (e) => {
  let saved = JSON.parse(localStorage.getItem("data"));
  if (e.target.type === "checkbox") {
    let curr = saved.find((obj) => obj.name === e.target.id);
    curr.isActive = e.target.checked;
    updateStorage(saved);
  } else if (e.target.type === "button") {
    let cardName = e.target.dataset.extension;
    let curr = saved.find((obj) => obj.name === cardName);
    removeExtension(curr);
  }
});

yesBtn.addEventListener("click", () => {
  extensionContainer.classList.toggle("hidden", false);
  resetContainer.classList.toggle("hidden", true);
  fetchData();
});

allFilterBtn.addEventListener("click", allFilter);
activeFilterBtn.addEventListener("click", activeFilter);
inActiveFilterBtn.addEventListener("click", inActiveFilter);
