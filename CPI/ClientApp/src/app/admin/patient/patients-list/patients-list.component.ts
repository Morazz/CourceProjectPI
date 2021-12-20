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
  public open_filter = false;
  filter = { login: "", gender: "", address: ""};

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

  openSearch() {
    this.open_filter = !this.open_filter;
  }

  nullFilter() {
    this.filter.login = "";
    this.filter.gender = "";
    this.filter.address = "";
    this.getPatients();
    this.open_filter = !this.open_filter;
  }

  findFilter() {
    this.patients = this.patients.filter(pat => pat.login.toLowerCase().includes(this.filter.login.toLowerCase())
      && pat.address.includes(this.filter.address)
      && pat.gender == this.filter.gender);
  }
}

export class Patient {
  constructor(public login: string,
    firstname: string,
    fathername: string,
    public surname: string,
    birthday: Date,
    public gender: string,
    public address: string,
    phone_number: string

  ) { }
}
