import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      {
        id: 1,
        ktun: 'Juho',
        salasana: 'qwerty',
        email: 'juho@sposti.fi',
        cities: ['alavus', 'helsinki'],
      },
      {
        id: 2,
        ktun: 'Testi',
        salasana: 'asd',
        email: 'testaaja@mail.com',
        cities: ['jyvaskyla', 'tampere'],
      },
    ];
    return { users };
  }
}
