import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityweatherComponent } from './cityweather/cityweather.component';
import { WeatherlistComponent } from './weatherlist/weatherlist.component';
import { FormsModule } from '@angular/forms';
import { NewweatherComponent } from './newweather/newweather.component';
import { RegisterComponent } from './register/register.component';

import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CityweatherComponent,
    WeatherlistComponent,
    NewweatherComponent,
    RegisterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
