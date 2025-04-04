// make sure we have access to local storage

export default function localStorageAvailable(): boolean {
  try {
    const key = 'test';
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, key);

      window.localStorage.removeItem(key);
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
