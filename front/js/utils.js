export function formatPrice(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  return new Intl.NumberFormat("fr-FR").format(Number(value)) + " €";
}

export function safeText(value, fallback = "—") {
  return value === null || value === undefined || value === "" ? fallback : value;
}

export function getImageUrl(car) {
  return car?.imageUrl || "./imgs/image.png";
}
