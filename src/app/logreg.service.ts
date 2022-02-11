import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HomepageService } from './homepage.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class LogregService {
  loggedIn!: boolean;
  changeLoggedIn: Subject<boolean> = new Subject<boolean>();
  loggedUser: Subject<User> = new Subject<User>();
  users!: User[];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.changeLoggedIn.subscribe((value) => {
      this.loggedIn = value;
    });
  }

  login(username: string, password: string) {
    this.http.get<User[]>('api/users').subscribe((elem) => (this.users = elem));
    setTimeout(() => {
      for (const user of this.users) {
        if (user.ktun === username && user.salasana === password) {
          this.changeLoggedIn.next(!this.loggedIn);
          this.loggedUser.next(user);
        }
      }
      return false;
    }, 500);
  }

  logout() {
    this.changeLoggedIn.next(!this.loggedIn);
    this.loggedUser.next();
  }

  newWeather(user: User): Observable<User> {
    return this.http.put<User>('api/users', user, this.httpOptions);
  }

  getAllUsers() {
    return this.http.get<User[]>('api/users');
  }
}
