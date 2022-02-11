import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-newweather',
  templateUrl: './newweather.component.html',
  styleUrls: ['./newweather.component.css'],
})
export class NewweatherComponent implements OnInit {
  city: string;

  constructor() {
    this.city = '';
  }

  @Output() getWeather = new EventEmitter<string>();

  // Luo uuden eventin joka lähetetään äitikomponentille. Eventin sisällä lähtee city-muuttujan sisältö
  sendData(value: string): void {
    this.getWeather.emit(value);
    this.city = '';
  }
  ngOnInit(): void {}
}
