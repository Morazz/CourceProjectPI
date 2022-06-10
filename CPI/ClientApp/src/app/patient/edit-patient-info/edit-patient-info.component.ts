import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-patient-info',
    templateUrl: './edit-patient-info.component.html',
    styleUrls: ['./edit-patient-info.component.css']
})
/** edit-patient-info component*/
export class EditPatientInfoComponent {
  public patient: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  public login: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getUser(this.login);
  }

  getUser(login: string) {
    this.http.get<Patient>(this.baseUrl + 'patient/' + login).subscribe(result => {
      if (result != null)
        this.patient = result;
      console.log(this.patient);
    }, error => console.error(error));
  }

  editPatient() {
    console.log(this.patient);
    this.http.put(this.baseUrl + 'patient', this.patient).subscribe(result => {
        this.router.navigate(['user-page', this.patient.login]);
    }, error => console.error(error));
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
