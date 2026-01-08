import { localCarsdata } from "./mock-data.js"

console.log("test", localCarsdata)

const params = new URLSearchParams(window.location.search);
const carId = params.get("id");
console.log("ID de la voiture :", carId);

const car = localCarsdata.find(c => c.id === carId);

if (!car) {
  console.error("Voiture introuvable");
} else {
  document.getElementById("car-name").textContent = car.name;
  document.getElementById("car-image").src = car.image;
  document.getElementById("car-image").alt = car.name;
  document.getElementById("car-description").textContent = car.description;
}
