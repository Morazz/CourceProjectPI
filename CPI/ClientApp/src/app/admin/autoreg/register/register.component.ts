import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../patient/add-patient/add-patient.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
  public user: PassData = new PassData("", "", "Пациент");
  public login: string;
  public patient: Patient = new Patient("", "", "", "", new Date(), "", "", "");

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
}

export class PassData {
  constructor(public login: string, public password: string, public status: string) { }
}
