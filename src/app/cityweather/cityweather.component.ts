import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-cityweather',
  templateUrl: './cityweather.component.html',
  styleUrls: ['./cityweather.component.css'],
})
export class CityweatherComponent implements OnInit {
  weather!: any;
  whatKindOfWeather!: 'Pilvinen' | 'Aurinkoinen' | 'Lumisade' | 'Vesisade';
  weatherPic!: string;
  @Input() city: string;
  @Output() remove = new EventEmitter<string>();

  constructor(private hpservice: HomepageService) {
    this.city = '';
  }

  // Haetaan säätiedot ja pyöristellään lämpötiloja ja
  // sijoitetaan niitä muuttujiin
  async fetchWeather() {
    this.weather = await this.hpservice.fetchWeather(this.city);
    this.weather.main.temp = Math.round(this.weather.main.temp * 10) / 10;
    this.weather.main.temp_min =
      Math.round(this.weather.main.temp_min * 10) / 10;
    this.weather.main.temp_max =
      Math.round(this.weather.main.temp_max * 10) / 10;
    // console.log(this.weather);
    this.changeWeatherAlike(this.weather);
  }

  // Säädetään kuvake sen perusteella millainen sää on.
  changeWeatherAlike(weather: any) {
    switch (weather.weather[0].main) {
      case 'Clouds':
        this.whatKindOfWeather = 'Pilvinen';
        this.weatherPic = '../../assets/pictures/cloud.png';
        break;

      case 'Snow':
        this.weatherPic = '../../assets/pictures/snow.png';
        this.whatKindOfWeather = 'Lumisade';
        break;

      case 'Clear':
        this.weatherPic = '../../assets/pictures/sun.png';
        this.whatKindOfWeather = 'Aurinkoinen';
        break;

      case 'Rain':
        this.weatherPic = '../../assets/pictures/rain.png';
        this.whatKindOfWeather = 'Vesisade';
        break;

      case 'Mist':
        this.weatherPic = '../../assets/pictures/cloud.png';
        this.whatKindOfWeather = 'Pilvinen';
        break;

      case 'Drizzle':
        this.weatherPic = '../../assets/pictures/cloud.png';
        this.whatKindOfWeather = 'Pilvinen';
        break;
    }
  }

  removeCity(value: string) {
    this.hpservice.removeCity(value);
  }

  ngOnInit(): void {
    this.fetchWeather();
  }
}
