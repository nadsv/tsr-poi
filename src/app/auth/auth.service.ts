import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';

import { TsrPoiService } from '../shared/tsr-poi.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private login: boolean = false;
  admin: boolean = false;
  private adminName = 'Стрелкова Ю.А.';
  private adminPassword = 'tsr46';
  usersChanged = new Subject<any>();

  constructor(private router: Router,
              private tsrPoiService: TsrPoiService) {}

  signinUser(user: string, password: string) {
    if (user == this.adminName && password == this.adminPassword) {
      this.login = true;
      this.admin = true;
    }
    if (user !== '') {
      this.login = true;
    }
    this.router.navigate(['/request']);
  }

  isAuthenticated() {
    return this.login;
  }

   getUsers() {
          this.tsrPoiService.fetchData(this.tsrPoiService.apiUrl+'users.php').subscribe(
                    (users) => this.usersChanged.next(users),
                    () => alert('Невозможно получить список пользователей!')
              )
    }

} 
