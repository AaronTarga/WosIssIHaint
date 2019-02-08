import { MatSnackBar } from '@angular/material';
import { ApiService } from './../../api.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/structure';

@Component({
  selector: 'app-verlauf',
  templateUrl: './verlauf.component.html',
  styleUrls: ['./verlauf.component.scss']
})
export class VerlaufComponent implements OnInit {

  links = null;
    /**
   * emits an event, if the favoration-status of an element is changed
   */
  @Output() favorationStatus = new EventEmitter<{
    status: boolean,
    element: Restaurant
  }>();

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {


  }



  ngOnInit() {
    this.api.getHistory().then(res => {
        this.links = res;
    });
  }


  isFavorite(id: string) {
    return this.api.favoritesContains(id);
  }

  toggleFavorite(id: string) {
    let status;
    try {
      status = this.api.toggleFavorites(id);
    } catch(error) {
      this.openSnackBar("Couldn't change favorite",'ok')
    }
    this.favorationStatus.emit({
      element: this.links[this.links.map(el => el['Id']).indexOf(id)],
      status: status
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
