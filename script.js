//variables

const themeButton = document.getElementById("themeButton");
const bodyContainer = document.getElementById("body");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
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
});
themeButton.addEventListener("click", toggleTheme);
