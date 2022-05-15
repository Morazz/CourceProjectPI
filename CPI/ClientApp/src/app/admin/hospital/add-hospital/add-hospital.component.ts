import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../../schedule/schedules-list/schedules-list.component';
import { Hospital, HospitalsListComponent } from '../hospitals-list/hospitals-list.component';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
/** add-hospital component*/
export class AddHospitalComponent {
  public login: string;
  public hospital: Hospital = new Hospital("", null, null, null, null, null);
  public schedules: Schedule[];
  errors: string[];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialogRef: MatDialogRef<AddHospitalComponent>) {
    this.login = activateRoute.snapshot.params['admin'];
    this.getSchedules();
  }

  getSchedules() {
    this.http.get<Schedule[]>(this.baseUrl + 'schedule').subscribe(result => {
      this.schedules = result;
    }, error => console.error(error));
  }

  postData() {
    this.http.get<Hospital>(this.baseUrl + 'hospital/' + this.hospital.hospital_id)
      .subscribe(
        result => {
          this.errors = [];
          if (result != null)
            this.errors.push("Учреждение с таким идентификатором уже существует");
          else
            this.http.post(this.baseUrl + 'hospital', this.hospital)
              .subscribe(
                result => {
                  this.close();
                }, error => console.log(error));
        }, error => console.log(error));
  }

  close() {
    this.dialogRef.close();
  }
}
