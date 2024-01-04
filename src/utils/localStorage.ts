export function getStore(keyName: string): any {
  const data = localStorage.getItem(keyName);
  if (data) {
    return JSON.parse(data);
  } else return undefined;
}

export function saveStore(keyName: string, data: any): boolean {
  if (keyName && data) {
    localStorage.setItem(keyName, JSON.stringify(data));
    return true;
  } else return false;
}
