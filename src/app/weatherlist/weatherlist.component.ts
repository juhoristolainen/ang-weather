import { Component, OnInit, Input } from '@angular/core';
import { HomepageService } from '../homepage.service';
import { LogregService } from '../logreg.service';
import { User } from '../user';

@Component({
  selector: 'app-weatherlist',
  templateUrl: './weatherlist.component.html',
  styleUrls: ['./weatherlist.component.css'],
})
export class WeatherlistComponent implements OnInit {
  cityAmount: string[] = [];
  standardCities = ['Helsinki', 'Jyväskylä', 'Tampere'];
  user!: User;
  testiuser: any;

  constructor(
    public hpService: HomepageService,
    private logreg: LogregService
  ) {
    // Tarkkailee kokoajan logreg-servicen loggedUser-muuttujaa. Mikäli kirjaudutaan sisään, niin
    // hpService vaihtaa näkyvissä olevat kaupungit sisäänkirjautuneen käyttäjän
    // tallentamiin kaupunkeihin. Jos kirjaudutaan ulos, niin näytetään ns. standardikaupungit.
    this.logreg.loggedUser.subscribe((value) => {
      this.user = value;
      // console.log(this.user);
      if (value) {
        this.hpService.cities = [];
        value.cities.forEach((city) => {
          this.hpService.cities = this.user.cities;
          this.getWeather(city);
        });
      } else {
        this.hpService.cities = [];
        // this.hpService.cities = this.standardCities;
        this.standardCities.forEach((elem) => {
          this.getWeather(elem);
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.hpService.cities.length === 0) {
      this.standardCities.forEach((city) => {
        this.getWeather(city);
      });
    }
  }

  // Ensin muuntaa ääkköset a, ja o -kirjaimiksi ja luo näistä taulukon. Sen jälkeen muuttaa taulukon takaisin
  // stringiksi, ja lähettää sen homepageServiceen
  getWeather(val: string): void {
    if (this.hpService.cities.length < 15) {
      let name = val.toLowerCase();
      let cityToArr: string[] = [];
      let cityToString = '';

      for (const char of name) {
        if (char == 'ä') {
          cityToArr.push('a');
        } else if (char == 'ö') {
          cityToArr.push('o');
        } else {
          cityToArr.push(char);
        }
      }
      for (const char of cityToArr) {
        cityToString += char;
      }
      if (this.logreg.loggedUser && this.user) {
        if (this.user.cities.includes(cityToString)) {
          console.log('ei voi lisätä samaa');
        } else {
          console.log('lisätään');
          this.user.cities.push(cityToString);
          this.logreg.newWeather(this.user).subscribe();
          // this.logreg.getAllUsers().subscribe((elem) => (this.testiuser = elem));
          // console.log(this.testiuser);
        }
      } else {
        if (!this.hpService.cities.includes(cityToString)) {
          this.hpService.cities.push(cityToString);
        }
      }
      // this.hpService.cities.push(cityToString);
    } else {
      window.alert('Voit lisätä vain 15 kaupunkia');
    }
  }
}
