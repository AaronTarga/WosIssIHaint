import { StorageNames } from './structure';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: string[] = [];
  constructor() {
    this.load();
   }

  private save(){
    localStorage.setItem(StorageNames.Favorites, JSON.stringify(this.favorites));
  }

  private load() {
    let favorites = localStorage.getItem(StorageNames.Favorites);

    if(!favorites){
      this.favorites = [];
    }else{
      try{
        this.favorites = JSON.parse(favorites);
      }catch(e){
        localStorage.removeItem(StorageNames.Favorites);
        this.favorites = [];
      }
    }
  }

  getFavorites() {
    return this.favorites;
  }

  addFavorites(id : string) {
    this.favorites.push(id);
    this.save();
  }

  removeFavorites(id: string){
    let i = this.favorites.indexOf(id) ;
    if(i != -1)
      this.favorites.splice(i,1);
    this.save();
  }

  toggleFavorites(id:string) {
    if(this.contains(id)) {
      this.removeFavorites(id);
      return false;
    } else {
      this.addFavorites(id);
      return true;
    }
  }

  contains(id:string): boolean {
    return this.favorites.indexOf(id) != -1;
  }
  clear() {
    this.favorites = [];
    this.save();
  }
}
