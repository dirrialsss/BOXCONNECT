// Завантаження даних боксерів
export async function fetchBoxers() {
  const res = await fetch('./json/boxers.json');
  return await res.json();
}
