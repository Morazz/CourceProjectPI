import { HttpClient } from '@angular/common/http';
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
  exists: boolean = true;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  authorize() {
    this.getUser();
    if (this.user.status != "")
      this.checkDoctor();
    if (this.user.status != "")
      this.checkPatient();
  }

  getUser() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.user.login).subscribe(result => {
      if (result != null) {
        this.user = result;
      }
      else this.exists = false;
    }, error => console.error(error));
  }

  checkPatient() {
    this.http.get<Patient>(this.baseUrl + 'patient/' + this.user.login).subscribe(result => {
      if (result != null)
        this.router.navigate(['user-page', this.user.login]);
    }, error => console.error(error));
  }

  checkDoctor() {
    this.http.get<Doctor>(this.baseUrl + 'doctor/' + this.user.login).subscribe(result => {
      if (result != null)
        this.router.navigate(['doctor-info', this.user.login]);
    }, error => console.error(error));
  }
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
