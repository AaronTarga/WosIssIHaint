import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  set restaurantId(restaurantId: string){
    this.loading = true;
    this.api.addHistory(restaurantId);
    this.data = this.api.getRestaurantsDetails(restaurantId).finally(() => { this.loading = false;   });
  }
  data = null;
  loading: boolean = true;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
    this.restaurantId = this.route.snapshot.params['id'];

    route.params.subscribe(params => {
      this.restaurantId = params['id']
    });
  }

  ngOnInit() {
  }

}
