import { SettingsService } from './../../settings.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { discardPeriodicTasks } from '@angular/core/testing';

declare let L;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  radius: number = this.settings.radius*1000;
  active: boolean = true;

  map;

  set restaurantId(restaurantId: string){
    this.api.getRestaurantsDetails(restaurantId).then( element => {
      this.loadMap(element);
    });
  }

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private settings: SettingsService, private snackBar: MatSnackBar) {
    this.restaurantId = this.route.snapshot.params['id'];


    route.params.subscribe(params => {
      this.restaurantId = params['id'];
    });
  }

  ngOnInit() {

    this.map = L.map('map').setView([51.505, -0.09], 13);
    this.loadMap(null);


  }

  //if data is set geolocation won't be triggered and only the given location is shown if not geolocation gets requested and all location in the setted radius are shown
  loadMap(data) {


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    if(data) {
      var lat = parseFloat(data['Latitude']);
      var long = parseFloat(data['Longitude']);
      var marker = L.marker([lat, long]).addTo(this.map);
      marker.bindPopup(data['Shortname'].startsWith("(KEIN MITGLIED)") ? data['Shortname'].substr(16) : data['Shortname']).openPopup();
      this.map.setView([lat, long], 13);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( loc => {
        var circle = L.circle([loc.coords.latitude, loc.coords.longitude], {
            color: 'white',
            fillColor: 'blue',
            fillOpacity: 0.5,
            radius: this.radius/100
        }).addTo(this.map);
        var rangeCircle = L.circle([loc.coords.latitude, loc.coords.longitude], {
          color: 'red',
          fillColor: 'grey',
          fillOpacity: 0.5,
          radius: this.radius
        }).addTo(this.map);
        this.map.setView([loc.coords.latitude, loc.coords.longitude], 13);
        this.addMarkers(loc.coords.latitude, loc.coords.longitude);
        }, error => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              this.openSnackBar('Das die Geolocation funktioniert muss auf ihren Standort zugegriffen werden können','OK');
              break;
            case error.POSITION_UNAVAILABLE:
              this.openSnackBar('Mit ihrem Gerät funktioniert die Standortfunktion nicht','OK');
              break;
            case error.TIMEOUT:
              this.openSnackBar('Das Zugreifen auf ihrem Standort war nicht möglich','OK');
              break;
          }
        });

      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  //Wait until all locations are set to get all bounds so map shows all locations with fitBounds
  async addMarkers(loclat,loclong) {
    let markerArray = [];
    let restaurants = await this.api.getRestaurants(loclat,loclong,this.radius,this.active,null);
    let prom = restaurants.map(async element => {
      let lat;
      let long;
      await this.api.getRestaurantsDetails(element.id).then( rest => {
        lat = parseFloat(rest['Latitude']);
        long = parseFloat(rest['Longitude']);
        var marker = L.marker([lat, long]).addTo(this.map);
        var content = document.createElement("div");
        var h = document.createElement("h3");
        h.textContent = element.name.startsWith("(KEIN MITGLIED)") ? element.name.substr(16) : element.name;
        var p = document.createElement("p");
        p.textContent = (rest['ContactInfos']['de']['Address'] != undefined ? rest['ContactInfos']['de']['Address'] : '') +  ' ' + (rest['ContactInfos']['de']['City'] != undefined ? rest['ContactInfos']['de']['City'] : '')+ ' ' + (rest['ContactInfos']['de']['ZipCode'] != undefined ? rest['ContactInfos']['de']['ZipCode'] : '');
        var  a = document.createElement("a");
        a.textContent = 'Zu Restaurant';
        a.style.cursor = 'pointer';
        a.style.color = '#0075BB';
        let self = this;
        a.onclick = function (event){
          self.router.navigateByUrl('/restaurant/' + element.id)
        };
        content.append(h);
        content.append(p);
        content.append(a);
        marker.bindPopup(content).openPopup();
      });
      markerArray.push( L.marker([lat,long]));
      return L.marker([lat,long]);
    });
    await Promise.all(prom)
    var group = L.featureGroup(markerArray);
    this.map.fitBounds(group.getBounds());
  }

}

