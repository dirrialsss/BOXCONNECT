// Завантаження даних про країни та міста
export async function fetchLocations() {
  const res = await fetch('./json/locations.json');
  return await res.json();
}
