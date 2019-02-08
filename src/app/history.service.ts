import { SettingsService } from './settings.service';
import { StorageNames } from './structure';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  history: string[] = [];
  constructor(private settings: SettingsService) {
    this.load();
   }

  private save(){
    localStorage.setItem(StorageNames.History, JSON.stringify(this.history));
  }

  private load() {
    let history = localStorage.getItem(StorageNames.History);

    if(!history){
      this.history = [];
    }else{
      try{
        this.history = JSON.parse(history);
      }catch(e){
        localStorage.removeItem(StorageNames.History);
        this.history = [];
      }
    }
  }

  getHistory() {
    return this.history;
  }

  addHistory(id : string) {
    let i = this.history.indexOf(id);
    if(i > -1)
      this.history.splice(i,1);
    this.history.splice(0,0,id);
    while(this.history.length > this.settings.history) {
      this.history.pop();
    }

    this.save();
  }

  clear() {
    this.history = [];
    this.save();
  }
}
