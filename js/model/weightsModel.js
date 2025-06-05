// Завантаження вагових категорій
export async function fetchWeights() {
  const res = await fetch('/json/weights.json');
  return await res.json();
}
