export function loadFromLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`Error loading "${key}" from localStorage`, err);
    return null;
  }
}

export function saveToLocalStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving "${key}" to localStorage`, err);
  }
}
