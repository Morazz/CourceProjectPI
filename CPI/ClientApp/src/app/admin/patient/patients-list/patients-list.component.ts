import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html',
    styleUrls: ['./patients-list.component.css']
})

export class PatientsListComponent {
  public patients: Patient[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getPatients();
  }

  getPatients() {
    this.http.get<Patient[]>(this.baseUrl + 'patient').subscribe(result => {
      this.patients = result;
    }, error => console.error(error));
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Patient[]>(this.baseUrl + 'patient/BySec/' + text).subscribe(result => {
        this.patients = result;
      }, error => console.error(error));
    }
    else this.getPatients();
  }
}

export class Patient {
  constructor(public login: string,
    firstname: string,
    fathername: string,
    surname: string,
    birthday: Date,
    gender: string,
    address: string,
    phone_number: string

  ) { }
}