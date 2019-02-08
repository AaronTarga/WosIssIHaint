import { credentials } from './../assets/credentials';
import { HistoryService } from './history.service';
import { FavoritesService } from './favorites.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Restaurant } from './structure';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apitoken = null;

  constructor(private http: HttpClient, private favorites: FavoritesService, private history: HistoryService) { }

  //Gets the token which is needed for to get data from the other web service by fetching it from  'http://tourism.opendatahub.bz.it/token
  async getToken() {
    const body = new HttpParams()
    .set('grant_type','password')
    .set('username', credentials.username )
    .set('password', credentials.password );
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })};
    return await this.http.post('http://tourism.opendatahub.bz.it/token',body,httpOptions).toPromise();
  }

   //Gets all restaurants and casts it into Restaurant Interface by fetching data from the http://tourism.opendatahub.bz.it/api/GastronomyReduced service if no token is set it gets a new one
  async getRestaurants(lat?: number , long?: number, rad?: number , active?: boolean , special?: string): Promise<Restaurant[]> {

    if(this.getApiToken() == null) {
      await this.getToken().then(result => {
        this.setApiToken(result['access_token']);
      });
    }

    var token = this.getApiToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + token
      })};
    let params = "?language=de";
    if(rad) {
      params += '&radius=' + rad;
    }
    if(active) {
      params += '&active=' + active;
    }
    if(lat & long) {
      params += '&latitude=' + lat + '&longitude=' + long;
    }

    if(special) {
      let cuisine = special.substring(special.indexOf('cu')+2,special.indexOf('ad'));
      params += '&cuisinecodefilter=' + cuisine;
      let facilities: number = parseInt(special.substring(special.indexOf('ad')+2,special.indexOf('cr'))) + parseInt(special.substring(special.indexOf('cr')+2,special.indexOf('se'))) + parseInt(special.substring(special.indexOf('se')+2,special.indexOf('ca')));
      params += '&facilitycodefilter=' + facilities;
      let categories = special.substring(special.indexOf('ca')+2,special.indexOf('di'));
      params += '&categorycodefilter=' + categories;
      let dishes = special.substring(special.indexOf('di')+2);
      params += '&dishcodefilter=' + dishes;
    }
    let ret = await this.http.get('http://tourism.opendatahub.bz.it/api/GastronomyReduced'+ params,httpOptions).toPromise();
    let list: Restaurant[] = [];
    for(let rest in ret) {
      list.push({id: ret[rest]['Id'], name: ret[rest]['Name']});
    }
    return list;
  }

  //Gets restaurant details by given id by fetching data from the http://tourism.opendatahub.bz.it/api/Gastronomy/{id} service if no token is set it gets a new one
  async getRestaurantsDetails(id: string) {
    if(this.getApiToken() == null) {
      await this.getToken().then(result => {
        this.setApiToken(result['access_token']);
      });
    }
    var token = await this.getApiToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + token
      })};
      let params = id
    return await this.http.get('http://tourism.opendatahub.bz.it/api/Gastronomy/'+ params,httpOptions).toPromise();
  }

  async getTypes() {
    if(this.getApiToken() == null) {
      await this.getToken().then(result => {
        this.setApiToken(result['access_token']);
      });
    }
    var token = await this.getApiToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + token
      })};
    return await this.http.get('http://tourism.opendatahub.bz.it/api/GastronomyTypes',httpOptions).toPromise();


  }

  setApiToken(apitoken: string) {
    this.apitoken = apitoken;
  }

  getApiToken(): string {
    return this.apitoken;
  }

  async getFavorites() {
    let favs = this.favorites.getFavorites();
    let prom = favs.map(async fav => {
      return await this.getRestaurantsDetails(fav);
    });
    return await Promise.all(prom);
  }

  addFavorites(id: string) {
    this.favorites.addFavorites(id);
  }

  favoritesContains(id: string): boolean {
    return this.favorites.contains(id);
  }
  toggleFavorites(id: string) {
    return this.favorites.toggleFavorites(id);
  }

  async getHistory() {
    let favs = this.history.getHistory();
    let prom = favs.map(async fav => {
      return await this.getRestaurantsDetails(fav);
    });
    return await Promise.all(prom);
  }

  addHistory(id: string) {
    this.history.addHistory(id);
  }





}


