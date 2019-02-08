import { MatSnackBar } from '@angular/material';
import { ApiService } from './../../api.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Restaurant } from 'src/app/structure';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-favoriten',
  templateUrl: './favoriten.component.html',
  styleUrls: ['./favoriten.component.scss']
})
export class FavoritenComponent implements OnInit {

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
    this.api.getFavorites().then(res => {
        this.links = res;
    });
  }

  ngOnDestroy() {

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
