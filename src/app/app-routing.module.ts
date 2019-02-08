import { ListeComponent } from './page/liste/liste.component';
import { FavoritenComponent } from './page/favoriten/favoriten.component';
import { VerlaufComponent } from './page/verlauf/verlauf.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'favoriten' , component: FavoritenComponent },
  { path: 'verlauf' , component: VerlaufComponent },
  { path: 'liste' , component: ListeComponent, runGuardsAndResolvers: 'always' },
  { path: 'liste/:filter' , component: ListeComponent, runGuardsAndResolvers: 'always' },
  { path: 'restaurant/:id', component: RestaurantComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
