import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-edit-patient',
    templateUrl: './edit-patient.component.html',
    styleUrls: ['./edit-patient.component.css']
})

export class EditPatientComponent {
  public admin: string;
  public patient: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  public login: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.admin = activateRoute.snapshot.params['admin'];
    this.getUser(this.login);
  }

  getUser(login: string) {
    this.http.get<Patient>(this.baseUrl + 'patient/' + login).subscribe(result => {
      if (result != null)
        this.patient = result;
    }, error => console.error(error));
  }

  editPatient() {
    //this.http.put(this.baseUrl + 'patient', this.patient).subscribe(result => {
    //    this.router.navigate(['patients-list', this.admin]);
    //}, error => console.error(error));
  }
}

export class Patient {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public birthday: Date,
    public gender: string,
    public address: string,
    public phone_number: string
  ) { }
}
