export function loadStorage(key: string) {
  const json: string | null = localStorage.getItem(key);
  return json ? JSON.parse(json) : {};
}

export function loadStorageRange(key: string) {
  const json: string | null = localStorage.getItem(key);
  return json ? JSON.parse(json) : 1;
}

export function loadStorageArray(key: string) {
  const json: string | null = localStorage.getItem(key);
  return json ? JSON.parse(json) : [];
}

export function loadStorageStatistic(key: string) {
  const json: string | null = localStorage.getItem(key);
  return json ? JSON.parse(json) : 0;
}

export function setLocalStorage(key: string, posts: any) {
  localStorage.setItem(key, JSON.stringify(posts));
}
