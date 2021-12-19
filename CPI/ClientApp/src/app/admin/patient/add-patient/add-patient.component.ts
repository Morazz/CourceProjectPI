import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent {
  public admin: string;
  public patient: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  public user: PassData = new PassData("", "");
  errors: string[] = [];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.admin = activateRoute.snapshot.params['admin'];
  }

  postPatient(login: string, password: string) {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.patient.login)
      .subscribe(
        result => {
          this.errors = [];
          if (result != null)
            this.errors.push("Пользователь с таким логином уже существует");
          else
            this.http.post(this.baseUrl + 'passdata', new PassData(this.patient.login, this.user.password))
              .subscribe(
                result => {
                  this.http.post(this.baseUrl + 'patient', this.patient)
                    .subscribe(
                      (data: any) => {
                        this.router.navigate(['/patients-list', this.admin]);
                      }, error => console.log(error));
                }, error => console.log(error));
        }, error => console.log(error));
  };
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
    public phone_number: string) { }
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status: string = "Пациент"
  ) {  }
}
