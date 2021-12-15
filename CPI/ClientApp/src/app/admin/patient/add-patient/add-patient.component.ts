import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent {

  public patient: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  public user: PassData = new PassData("", "");

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  postPatient(login: string, password: string) {
    this.http.post(this.baseUrl + 'passdata', new PassData(login, this.user.password))
      .subscribe(
        result => {
          this.http.post(this.baseUrl + 'patient', this.patient)
            .subscribe(
              (data: any) => {
                this.router.navigate(['/patients-list']);
              }, error => console.log(error));
        }, error => console.log(error));
  };
}

export class Patient {
  constructor(
    login: string,
    firstname: string,
    fathername: string,
    surname: string,
    birthday: Date,
    gender: string,
    address: string,
    phone_number: string) { }
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status: string = "Пациент"
  ) {  }
}
