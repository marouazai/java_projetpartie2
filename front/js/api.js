import { API_CONFIG } from "./config.js";

async function request(path, options = {}) {
  const response = await fetch(API_CONFIG.baseURL + path, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_CONFIG.apiKey,
    },
    ...options,
  });

  if (!response.ok) {
    const err = new Error(`Erreur HTTP ${response.status}`);
    err.status = response.status;
    throw err;
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function fetchCars() {
  const res = await request(API_CONFIG.endpoints.cars);
  return Array.isArray(res) ? res : res.data;
}

export async function fetchCarById(id) {
  try {
    const res = await request(`${API_CONFIG.endpoints.cars}/${id}`);
    return res.data ?? res;
  } catch {
    return null;
  }
}

export async function createCar(car) {
  return request(API_CONFIG.endpoints.cars, {
    method: "POST",
    body: JSON.stringify(car),
  });
}

export async function deleteCar(carId) {
  try {
    await request(`${API_CONFIG.endpoints.cars}/${carId}`, { method: "DELETE" });
    return { ok: true };
  } catch (err) {
    return { ok: false, status: err?.status || 0 };
  }
}
