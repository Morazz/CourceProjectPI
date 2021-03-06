import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injector, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { equal } from 'assert';
import { Patient } from '../../patient/add-patient/add-patient.component';
import { MatTooltipModule } from '@angular/material';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
  public user: PassData = new PassData("", "", "Пациент", "");
  public login: string;
  public patient: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  errors: string[] = [];

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  addUser() {
    this.http.post(this.baseUrl + 'passdata', this.user)
      .subscribe(
        (data: any) => {
          this.patient.login = this.user.login;
          this.http.post(this.baseUrl + 'patient', this.patient)
            .subscribe(result => {
              this.router.navigate(['user-page', this.user.login]);
            }, error => console.error(error));
        }, error => console.error(error));
  }

  checkUser() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.user.login)
      .subscribe(
        result => {
          this.errors = [];
          if (result != null)
            this.errors.push("Пользователь с таким логином уже существует");
          else this.checkPassword();
        }, error => console.log(error));
  }

  checkPassword() {
    if (this.user.password != this.user.pswrepeat)
      this.errors.push("Пароли не совпадают");
    else this.addUser();
    }
  }

export class PassData {
  constructor(public login: string, public password: string, public status: string, public pswrepeat: string) { }
}

