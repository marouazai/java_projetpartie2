import { initHomePage } from "./home.js";
import { initCarDetailsPage } from "./car-details.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".card-cont")) {
    initHomePage();
  }

  if (document.querySelector(".car-details")) {
    initCarDetailsPage();
  }
});
