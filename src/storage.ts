export function loadStorageBoolean(key: string) {
  const json: string | null = localStorage.getItem(key);
  return json ? JSON.parse(json) : {};
}

export function loadStorageNumber(key: string) {
  const json: string | null = localStorage.getItem(key);
  return json ? JSON.parse(json) : 0;
}

export function setLocalStorage(key: string, posts: any) {
  localStorage.setItem(key, JSON.stringify(posts));
}

export const defaultRange = {
  minRange: 1,
  maxComplexityRange: 10,
  maxTimeRange: 15,
  step: 1,
};
