import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,  public router: Router, private _location: Location, public settings: SettingsService) {}


  ngOnInit() {

  }

  backClicked() {
    this._location.back();
  }


  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value + 'km';
  }



}
