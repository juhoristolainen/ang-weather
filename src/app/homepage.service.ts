import { Injectable } from '@angular/core';
import { LogregService } from './logreg.service';
import { User } from './user';
@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  key: string = 'AVAIN PIILOTETTU';
  user!: User;
  cities: string[] = [];

  constructor() {}

  // Fetchaa jokaisen kaupungin säätiedot API:sta.
  async fetchWeather(city: string) {
    const response = await fetch(`URL PIILOTETTU`);
    let weather = await response.json();

    // Mikäli responsessa tapahtuu joku virhe, niin poistetaan kyseinen hakusana cities -taulukosta suoraa
    // Mikäli response menee läpi, niin palautetaan weather -muuttujan tiedot komponentille.

    if (response.status !== 200) {
      this.removeCity(city);
    } else {
      return weather;
    }
  }

  //Funktio, jolla saadaan tiedot tästä servicestä eteenpäin komponentille.
  getCities(): string[] {
    return this.cities;
  }

  // Poistaa kaupungin listalta
  removeCity(city: string) {
    // Muuttaa parametrinä saadun city -muuttujan kaikki kirjaimet pieniksi.
    let cityToRemove = city.toLowerCase();
    // Hakee oikean indeksin cities-taulukosta
    let index = this.cities.indexOf(cityToRemove);
    // Poistaa kaupungin taulukosta splicellä.
    this.cities.splice(index, 1);
  }
}
