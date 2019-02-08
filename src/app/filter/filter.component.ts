import { ApiService } from './../api.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() count: number;

  cuisine = new FormControl();
  cuisineList: string[] = [];
  cuisineTypes = [];

  addition = new FormControl();
  additionList: string[] = [];
  additionTypes = [];

  creditcard = new FormControl();
  creditcardList: string[] = [];
  creditcardTypes = [];

  seal = new FormControl();
  sealList: string[] = [];
  sealTypes = [];

  category = new FormControl();
  categoryList: string[] = [];
  categoryTypes = [];

  dish = new FormControl();
  dishList: string[] = [];
  dishTypes = [];

  types;


  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.setFilters();
  }

  filter() {
    let string = '';
    string += 'cu';
    if(this.cuisine.value != null) {
      if(this.cuisine.value.length > 0) {
        let count: number = 0;
        this.cuisine.value.forEach(element => {
          this.types.map( res => {
            if(res['TypeDesc']['de'] == element)
              count += res['Bitmask'];
          });
        });
        string += count;
      }
      else {
        string += 0;
      }
    }else {
      string += 0;
    }
    string += 'ad';
    if(this.addition.value != null) {
      if(this.addition.value.length > 0) {
        let count: number = 0;
        this.addition.value.forEach(element => {
          this.types.map( res => {
            if(res['TypeDesc']['de'] == element)
              count += res['Bitmask'];
          });
        });
        string += count;
      }
      else {
        string += 0;
      }
    }else {
      string += 0;
    }
    string += 'cr';
    if(this.creditcard.value != null) {
      if(this.creditcard.value.length > 0) {
        let count: number = 0;
        this.creditcard.value.forEach(element => {
          this.types.map( res => {
            if(res['TypeDesc']['de'] == element)
              count += res['Bitmask'];
          });
        });
        string += count;
      }else {
        string += 0;
      }
    }else {
      string += 0;
    }
    string += 'se';
    if(this.seal.value != null) {
      if(this.seal.value.length > 0) {
        let count: number = 0;
        this.seal.value.forEach(element => {
          this.types.map( res => {
            if(res['TypeDesc']['de'] == element)
              count += res['Bitmask'];
          });
        });
        string += count;
      }else {
        string += 0;
      }
    }else {
      string += 0;
    }
    string += 'ca';
    if(this.category.value != null) {
      if(this.category.value.length > 0) {
        let count: number = 0;
        this.category.value.forEach(element => {
          this.types.map( res => {
            if(res['TypeDesc']['de'] == element)
              count += res['Bitmask'];
          });
        });
        string += count;
      }else {
        string += 0;
      }
    }else {
      string += 0;
    }
    string += 'di';
    if(this.dish.value != null) {
      if(this.dish.value.length > 0) {
        let count: number = 0;
        this.dish.value.forEach(element => {
          this.types.map( res => {
            if(res['TypeDesc']['de'] == element)
              count += res['Bitmask'];
          });
        });
        string += count;
      }else {
        string += 0;
      }
    } else {
      string+= 0;
    }



    this.router.navigateByUrl('/liste/' + string);
  }

  //gets all types from opendatahub and then adds them to view
  async setFilters() {
    this.types = await this.api.getTypes();
    this.types.filter( element => {
      if(element['Type'] == 'CuisineCodes')
        return true;
      else
        false
    }).map( result => {
      this.cuisineList.push(result['TypeDesc']['de']);
      this.cuisineTypes.push(result);
    });
    this.types.filter( element => {
      if(element['Type'] == 'FacilityCodes_Equipment')
        return true;
      else
        false
    }).map( result => {
      this.additionList.push(result['TypeDesc']['de']);
      this.additionTypes.push(result);
    });
    this.types.filter( element => {
      if(element['Type'] == 'FacilityCodes_CreditCard')
        return true;
      else
        false
    }).map( result => {
      this.creditcardList.push(result['TypeDesc']['de']);
      this.creditcardTypes.push(result);
    });
    this.types.filter( element => {
      if(element['Type'] == 'FacilityCodes_QualitySeals')
        return true;
      else
        false
    }).map( result => {
      this.sealList.push(result['TypeDesc']['de']);
      this.sealTypes.push(result);
    });
    this.types.filter( element => {
      if(element['Type'] == 'CategoryCodes')
        return true;
      else
        false
    }).map( result => {
      this.categoryList.push(result['TypeDesc']['de']);
      this.categoryTypes.push(result);
    });
    this.types.filter( element => {
      if(element['Type'] == 'DishCodes')
        return true;
      else
        false
    }).map( result => {
      this.dishList.push(result['TypeDesc']['de']);
      this.dishTypes.push(result);
    });

    //check if filters are already set and enable them on new siteload
    let values = this.router.url.substring(7);
    if(values.length > 0) {
      let cuisine: number = parseInt(values.substring(values.indexOf('cu')+2,values.indexOf('ad')));
      if(cuisine > 0) {
        let i = this.cuisineTypes.length -1;
        let back = [];
        while( i >= 0) {
          if(cuisine - this.cuisineTypes[i]['Bitmask'] >= 0) {
            back.push(this.cuisineTypes[i]['TypeDesc']['de']);
            cuisine = cuisine - this.cuisineTypes[i]['Bitmask'];
          }
          i --;
        }
        this.cuisine.setValue(back);
      }
      let facilities: number = parseInt(values.substring(values.indexOf('ad')+2,values.indexOf('cr'))) + parseInt(values.substring(values.indexOf('cr')+2,values.indexOf('se'))) + parseInt(values.substring(values.indexOf('se')+2,values.indexOf('ca')));
      if(facilities > 0) {
        let i = this.sealTypes.length - 1;
        let sback = [];
        while( i >= 0) {
          if(facilities - this.sealTypes[i]['Bitmask'] >= 0) {
            sback.push(this.sealTypes[i]['TypeDesc']['de']);
            facilities = facilities - this.sealTypes[i]['Bitmask'];
          }
          i --;
        }
        this.seal.setValue(sback);
        i = this.additionTypes.length -1;
        let aback = [];
        while( i >= 0) {
          if(facilities - this.additionTypes[i]['Bitmask'] >= 0) {
            aback.push(this.additionTypes[i]['TypeDesc']['de']);
            facilities = facilities - this.additionTypes[i]['Bitmask'];
          }
          i --;
        }
        this.addition.setValue(aback);
        i= this.creditcardTypes.length -1 ;
        let cback = [];
        while( i  >= 0) {
          if(facilities - this.creditcardTypes[i]['Bitmask'] >= 0) {
            cback.push(this.creditcardTypes[i]['TypeDesc']['de']);
            facilities = facilities - this.creditcardTypes[i]['Bitmask'];
          }
          i --;
        }
        this.creditcard.setValue(cback);
      }
      let categories = parseInt(values.substring(values.indexOf('ca')+2,values.indexOf('di')));
      if(categories > 0) {
        let i = this.categoryTypes.length -1;
        let back = [];
        while( i >= 0) {
          if(categories - this.categoryTypes[i]['Bitmask'] >= 0) {
            back.push(this.categoryTypes[i]['TypeDesc']['de']);
            categories = categories - this.categoryTypes[i]['Bitmask'];
          }
          i --;
        }
        this.category.setValue(back);
      }
      let dishes = parseInt(values.substring(values.indexOf('di')+2));
      if(dishes > 0) {
        let i = this.dishTypes.length -1;
        let back = [];
        while( i >= 0) {
          if(dishes - this.dishTypes[i]['Bitmask'] >= 0) {
            back.push(this.dishTypes[i]['TypeDesc']['de']);
            dishes = dishes - this.dishTypes[i]['Bitmask'];
          }
          i --;
        }
        this.dish.setValue(back);
      }
    }
  }

  clear() {
    this.router.navigateByUrl('liste')
  }




}
