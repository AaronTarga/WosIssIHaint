import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApiService } from './../../api.service';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Restaurant } from 'src/app/structure';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';



@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  end: false;

  offset = new BehaviorSubject(null);

  infinite: Observable<any[]>;

  links: Restaurant[] = null;
    /**
   * emits an event, if the favoration-status of an element is changed
   */
  @Output() favorationStatus = new EventEmitter<{
    status: boolean,
    element: Restaurant
  }>();
  spec: string = '';

  navigationSubscription;

  batch: 40;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    route.params.subscribe(params => {
      var test = params['filter'];
      if(test) {
        this.spec = test;

      } else {
        this.spec = '';
      }
    });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

  }

  //fetches new restaurants with new filters
  initialiseInvites() {
    this.api.getRestaurants(null,null,null,null,this.spec).then(restaurants=> {
      this.links = restaurants;

    }).catch(error => {
      this.links = [];
    });
  }


  ngOnInit() {
    if(this.spec != '') {
      this.api.getRestaurants(null,null,null,null,this.spec).then(restaurants=> {
        this.links = restaurants;

      }).catch(error => {
        this.links = [];
      });;
    }
    else {
      this.api.getRestaurants().then(restaurants=> {
        this.links = restaurants;
      }).catch(error => {
        this.links = [];
      });;
    }

  }

  ngOnDestroy() {
    //If it's not getting cleared it will run on every navigitionEnd event
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
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
      element: this.links[this.links.map(el => el.id).indexOf(id)],
      status: status
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //fetches new restaurants when scrolling
  getBatch(offset) {
    return this.links.slice(offset,(offset+this.batch))
  }

  //triggers getBatch when end equals total
  nextBatch(e, offset) {
    if (this.end) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.offset.next(offset);
    }
  }

}
