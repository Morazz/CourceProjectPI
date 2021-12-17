import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
/** authorize component*/
export class AuthorizeComponent {

  public user: PassData = new PassData("", "", "");
  roles: string[] = ["Пациент", "Врач", "Администратор"];
  public login: string;
  public password: string;
  errors: string[] = [];
 
  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  authorize() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.user.login).subscribe(result => {
      this.errors = [];
      if (result != null) {
        this.user = result;
        if (this.user.password != this.password)
          this.errors.push("Неверный пароль");
        else
          this.redirect();
      }
      else this.errors.push("Пользователь с таким именем не существует");
    }, error => console.error(error));
  }

  redirect() {
    switch (this.user.status) {
      case "Пациент": {
        this.router.navigate(['user-page', this.user.login]);
      }
        break;
      case "Врач": {
        this.router.navigate(['doctor-info', this.user.login]);
      }
        break;
      case "Администратор": {
        this.router.navigate(['admin-panel', this.user.login]);
      }
        break;
    }
  }
  


  //authorize() {
  //  this.getUser();
  //  if (this.user.status != "")
  //    this.checkDoctor();
  //  if (this.user.status != "")
  //    this.checkPatient();
  //}

  //getUser() {
  //  this.http.get<PassData>(this.baseUrl + 'passdata/' + this.user.login).subscribe(result => {
  //    if (result != null) {
  //      this.user = result;
  //    }
  //    else this.exists = false;
  //  }, error => console.error(error));
  //}

  //checkPatient() {
  //  this.http.get<Patient>(this.baseUrl + 'patient/' + this.user.login).subscribe(result => {
  //    if (result != null)
  //      this.router.navigate(['user-page', this.user.login]);
  //  }, error => console.error(error));
  //}

  //checkDoctor() {
  //  this.http.get<Doctor>(this.baseUrl + 'doctor/' + this.user.login).subscribe(result => {
  //    if (result != null)
  //      this.router.navigate(['doctor-info', this.user.login]);
  //  }, error => console.error(error));
  //}
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status: string
  ) { }
}
export class Patient {
  constructor(
    public login: string
  ) { }
}

export class Doctor {
  constructor(
    public login: string
  ) { }
}
