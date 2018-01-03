import { Component, OnInit, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { TsrPoiService } from '../../shared/tsr-poi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private tsrPoiService: TsrPoiService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const user = form.value.user;
    const password = form.value.password;
    this.tsrPoiService.user = form.value.user;
    this.auth.signinUser(user, password);
    this.tsrPoiService.isAdmin = this.auth.admin;
  }

}
