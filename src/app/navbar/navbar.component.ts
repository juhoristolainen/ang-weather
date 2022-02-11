import { Component, OnInit } from '@angular/core';
import { LogregService } from '../logreg.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: string = '';
  password: string = '';
  loggedIn = false;

  constructor(private logreg: LogregService) {
    this.logreg.changeLoggedIn.subscribe((value) => (this.loggedIn = value));
  }

  ngOnInit(): void {}

  login(username: string, password: string) {
    this.logreg.login(username, password);
  }

  logout() {
    this.logreg.logout();
  }
}
