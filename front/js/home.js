import { fetchCars, deleteCar } from "./api.js";
import { displayCars, showLoading } from "./dom.js";
import { MESSAGES } from "./config.js";

let carToDelete = null;
let cardToDelete = null;

function closeDeleteModal() {
  const modalEl = document.getElementById("confirmDeleteModal");
  if (!modalEl) return;
  const instance = bootstrap.Modal.getInstance(modalEl);
  if (instance) instance.hide();
}

async function confirmDeletion() {
  if (!carToDelete || !cardToDelete) return;

  const confirmBtn = document.getElementById("confirmDeleteBtn");
  const cancelBtn = document.getElementById("cancelDeleteBtn");

  if (confirmBtn) { confirmBtn.disabled = true; confirmBtn.textContent = "Suppression..."; }
  if (cancelBtn) cancelBtn.disabled = true;

  const result = await deleteCar(carToDelete);

  if (result.ok) {
    cardToDelete.remove();
    closeDeleteModal();
  } else if (result.status === 404) {
    cardToDelete.remove();
    alert(MESSAGES.ALREADY_DELETED);
    closeDeleteModal();
  } else {
    alert(MESSAGES.DELETE_ERROR);
  }

  carToDelete = null;
  cardToDelete = null;

  if (confirmBtn) { confirmBtn.disabled = false; confirmBtn.textContent = "Confirmer"; }
  if (cancelBtn) cancelBtn.disabled = false;
}

function setupDeleteHandler() {
  const container = document.querySelector(".card-cont");
  if (!container) return;

  container.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest("button[data-car-id]");
    if (!deleteBtn) return;

    carToDelete = deleteBtn.dataset.carId;
    cardToDelete = deleteBtn.closest(".card");

    const modalEl = document.getElementById("confirmDeleteModal");
    const confirmModal = new bootstrap.Modal(modalEl);
    confirmModal.show();
  });
}

function setupConfirmModalButton() {
  const confirmBtn = document.getElementById("confirmDeleteBtn");
  if (!confirmBtn) return;
  confirmBtn.addEventListener("click", confirmDeletion);
}

export async function initHomePage() {
  const container = document.querySelector(".card-cont");
  if (!container) return;

  showLoading(container, MESSAGES.LOADING_CARS);
  const cars = await fetchCars();
  displayCars(cars, container);

  setupDeleteHandler();
  setupConfirmModalButton();
}
