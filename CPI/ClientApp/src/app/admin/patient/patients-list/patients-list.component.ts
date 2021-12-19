import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html',
    styleUrls: ['./patients-list.component.css']
})

export class PatientsListComponent {
  public admin: string;
  public patients: Patient[];

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string) {
    this.admin = activateRoute.snapshot.params['admin'];
    this.getPatients();
  }

  getPatients() {
    this.http.get<Patient[]>(this.baseUrl + 'patient').subscribe(result => {
      this.patients = result;
    }, error => console.error(error));
  }

  deletePatient(login: string) {
    if (confirm("Подтвердите удаление: " + login)) {
      this.http.delete(this.baseUrl + 'patient', { params: new HttpParams().set('login', login) })
        .subscribe(
          result => {
            this.http.delete(this.baseUrl + 'passdata', { params: new HttpParams().set('login', login) })
              .subscribe(
                result => {
                  this.getPatients();
                },
                error => console.log(error));
          },
          error => console.log(error));
    }
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
