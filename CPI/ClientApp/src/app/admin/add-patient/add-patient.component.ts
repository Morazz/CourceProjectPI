import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent {

  patient: Patient;

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  postPatient() {
    this.http.post(this.baseUrl + 'patient', this.patient)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/patients-list']);
        }, error => console.log(error));
  };
}

interface Patient {
  login: string; firstname: string; fathername: string; surname: string;
  birthday: Date; gender: string; address: string; phone_number: string;
}
