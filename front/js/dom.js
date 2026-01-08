import { formatPrice, safeText, getImageUrl } from "./utils.js";

export function showLoading(container, text = "Chargement...") {
  container.innerHTML = `
    <div class="text-center my-5">
      <div class="spinner-border"></div>
      <p class="mt-3">${text}</p>
    </div>
  `;
}

export function showError(container, message) {
  container.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

export function showEmpty(container, message = "Aucune voiture disponible.") {
  container.innerHTML = `<div class="alert alert-warning">${message}</div>`;
}

export function createCarCard(car) {
  const article = document.createElement("article");
  article.className = "card shadow-sm";
  article.dataset.carId = car.id;

  article.innerHTML = `
    <a href="car.html?id=${car.id}">
      <img src="${getImageUrl(car)}" class="card-img-top" alt="${car.brand}">
    </a>
    <div class="card-body">
      <h5 class="card-title">${safeText(car.year)} ${safeText(car.brand)} ${safeText(car.model)}</h5>
      <p class="card-text">${safeText(car.description, "Aucune description")}</p>

      <div class="d-flex gap-2">
        <a href="car.html?id=${car.id}" class="btn btn-primary">See more</a>
        <button class="btn btn-outline-danger btn-delete" data-car-id="${car.id}">
          Supprimer
        </button>
      </div>
    </div>
  `;
  return article;
}

export function displayCars(cars, container) {
  container.innerHTML = "";

  if (!cars || cars.length === 0) {
    showEmpty(container);
    return;
  }

  const fragment = document.createDocumentFragment();
  cars.forEach((car) => fragment.appendChild(createCarCard(car)));
  container.appendChild(fragment);
}

export function displayCar(car, container) {
  if (!car) {
    showError(container, "Voiture non trouvée.");
    return;
  }

  container.innerHTML = `
    <h2 class="text-center mb-4">${car.brand} ${car.model}</h2>
    <img src="${getImageUrl(car)}" class="img-fluid mb-4">
    <table class="table">
      <tr><th>Année</th><td>${car.year}</td></tr>
      <tr><th>Couleur</th><td>${car.color}</td></tr>
      <tr><th>Prix</th><td>${formatPrice(car.price)}</td></tr>
      <tr><th>Kilométrage</th><td>${car.mileage} km</td></tr>
    </table>
  `;
}
