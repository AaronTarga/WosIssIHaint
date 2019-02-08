export interface Restaurant {
  id: string,
  name: string,
}

export interface Settings {
  radius?: number,
  history?: number,
}

export const StorageNames = {
  Settings: 'SETTINGS',
  Favorites: 'FAVORITES',
  History: 'History'
}

