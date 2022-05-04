import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../../schedule/schedules-list/schedules-list.component';
import { Hospital } from '../hospitals-list/hospitals-list.component';

@Component({
    selector: 'app-add-hospital',
    templateUrl: './add-hospital.component.html',
    styleUrls: ['./add-hospital.component.css']
})
/** add-hospital component*/
export class AddHospitalComponent {
  public admin: string;
  public hospital: Hospital = new Hospital("", null, null, null, null, null);
  public schedules: Schedule[];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialogRef: MatDialogRef<AddHospitalComponent>) {
    this.admin = activateRoute.snapshot.params['admin'];
    this.getSchedules();
  }

  getSchedules() {
    this.http.get<Schedule[]>(this.baseUrl + 'schedule').subscribe(result => {
      this.schedules = result;
    }, error => console.error(error));
  }

  postData() {
    this.http.post(this.baseUrl + 'hospital', this.hospital)
      .subscribe(
        result => {
          this.close();
        }, error => console.log(error));
  }

  close() {
    this.dialogRef.close();
  }
}
