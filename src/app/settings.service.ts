import { StorageNames, Settings } from './structure';
import { Injectable } from '@angular/core';

const def: Settings = {
  radius: 2000,
  history: 50
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings;

  constructor(){
    this.load();
  }

  private save(){
    localStorage.setItem(StorageNames.Settings, JSON.stringify(this.settings));
  }

  private load() {
    let settings = localStorage.getItem(StorageNames.Settings);

    if(!settings){
      this.settings = { };
    }else{
      try{
        this.settings = JSON.parse(settings);
      }catch(e){
        localStorage.removeItem(StorageNames.Settings);
        this.settings = { };
      }
    }
  }

  get radius() {
    return this.settings.radius ? this.settings.radius/1000 : def.radius/1000;
  }

  set radius(radius: number) {
    this.settings.radius = radius*1000;
    this.save();
  }


  get history() {
    return this.settings.history ? this.settings.history : def.history;
  }

  set history(history: number) {
    this.settings.history = history;
    this.save();
  }
}
