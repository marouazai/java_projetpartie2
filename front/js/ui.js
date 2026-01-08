function safeText(value, fallback = "—") {
  return value === null || value === undefined || value === "" ? fallback : value;
}

function formatPrice(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  return new Intl.NumberFormat("fr-FR").format(Number(value)) + " €";
}

function getImageUrl(car) {
  // tu as imgs/image.png dans ton projet
  return car?.imageUrl || "./imgs/image.png";
}

export function showLoading(container, text = "Chargement...") {
  container.innerHTML = `
    <div class="text-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">${text}</span>
      </div>
      <p class="mt-3 text-muted">${text}</p>
    </div>
  `;
}

export function showError(container, message) {
  container.innerHTML = "";
  const alert = document.createElement("div");
  alert.className = "alert alert-danger";
  alert.textContent = message;
  container.appendChild(alert);
}

export function createCarCard(car) {
  const article = document.createElement("article");
  article.className = "card shadow-sm";

  const linkImg = document.createElement("a");
  linkImg.href = `car.html?id=${car.id}`;
  linkImg.className = "text-decoration-none";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = getImageUrl(car);
  img.alt = `${safeText(car.year)} ${safeText(car.brand)} ${safeText(car.model)}`;

  linkImg.appendChild(img);

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = `${safeText(car.year)} ${safeText(car.brand)} ${safeText(car.model)}`;

  const desc = document.createElement("p");
  desc.className = "card-text";
  desc.textContent = safeText(car.description, "Description non disponible");

  const btn = document.createElement("a");
  btn.className = "btn btn-primary";
  btn.href = `car.html?id=${car.id}`;
  btn.textContent = "See more";

  body.append(title, desc, btn);
  article.append(linkImg, body);

  return article;
}

export function renderCars(container, cars) {
  container.innerHTML = "";

  if (!cars || cars.length === 0) {
    const msg = document.createElement("p");
    msg.className = "text-muted";
    msg.textContent = "Aucune voiture disponible.";
    container.appendChild(msg);
    return;
  }

  const frag = document.createDocumentFragment();
  cars.forEach((car) => frag.appendChild(createCarCard(car)));
  container.appendChild(frag);
}

export function renderCarDetails(container, car) {
  if (!car) {
    container.innerHTML = `<p class="text-danger">Voiture non trouvée.</p>`;
    return;
  }

  const title = `${safeText(car.brand)} ${safeText(car.model)}`;

  container.innerHTML = `
    <h2 class="mb-4 text-center">${title}</h2>

    <div class="text-center">
      <img src="${getImageUrl(car)}" alt="${title}" class="mb-4" style="max-width: 520px; width:100%; border-radius: 10px;" />
    </div>

    <table class="table table-striped">
      <tbody>
        <tr><th>ID</th><td>${safeText(car.id)}</td></tr>
        <tr><th>Année</th><td>${safeText(car.year)}</td></tr>
        <tr><th>Couleur</th><td>${safeText(car.color)}</td></tr>
        <tr><th>Prix</th><td>${formatPrice(car.price)}</td></tr>
        <tr><th>Kilométrage</th><td>${car.mileage ? new Intl.NumberFormat("fr-FR").format(car.mileage) + " km" : "—"}</td></tr>
        <tr><th>Description</th><td>${safeText(car.description, "Aucune description")}</td></tr>
      </tbody>
    </table>
  `;
}
