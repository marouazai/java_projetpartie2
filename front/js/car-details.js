import { fetchCarById } from "./api.js";
import { displayCar, showLoading } from "./dom.js";

export async function initCarDetailsPage() {
  const container = document.querySelector(".car-details");
  if (!container) return;

  showLoading(container);
  const carId = new URLSearchParams(window.location.search).get("id");
  const car = await fetchCarById(carId);
  displayCar(car, container);
}
