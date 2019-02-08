import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './page/home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatSnackBarModule, MatCardModule, MatProgressSpinnerModule, MatSliderModule, MatExpansionModule } from '@angular/material';
import { VerlaufComponent } from './page/verlauf/verlauf.component';
import { FavoritenComponent } from './page/favoriten/favoriten.component';
import { HttpClientModule } from '@angular/common/http';
import { ListeComponent } from './page/liste/liste.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { KeysPipe } from 'src/app/keys.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    KeysPipe,
    AppComponent,
    HomeComponent,
    MainNavComponent,
    VerlaufComponent,
    FavoritenComponent,
    ListeComponent,
    RestaurantComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    ScrollingModule,
    MatSliderModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
