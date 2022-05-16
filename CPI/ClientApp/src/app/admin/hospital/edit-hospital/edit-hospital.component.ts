import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { hosp_type } from '../../../../globals';
import { Schedule } from '../../schedule/add-schedule/add-schedule.component';
import { Hospital } from '../hospitals-list/hospitals-list.component';

@Component({
    selector: 'app-edit-hospital',
    templateUrl: './edit-hospital.component.html',
    styleUrls: ['./edit-hospital.component.css']
})
/** edit-hospital component*/
export class EditHospitalComponent {

  public hospital: Hospital = new Hospital("", null, null, null, null, null, null);
  public schedules: Schedule[];
  public hosp_type: string[] = hosp_type;
  errors: string[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<EditHospitalComponent>) {
    this.getHospital(data);
    this.getSchedules();
  }

  getHospital(id: string) {
    this.http.get<Hospital>(this.baseUrl + 'hospital/' + id).subscribe(result => {
      this.hospital = result;
      console.log(this.hospital);
    }, error => console.error(error));
  }

  getSchedules() {
    this.http.get<Schedule[]>(this.baseUrl + 'schedule').subscribe(result => {
      this.schedules = result;
    }, error => console.error(error));
  }

  postData() {
    this.http.put(this.baseUrl + 'hospital', this.hospital)
      .subscribe(result => {
        console.log(this.hospital);
        this.close();
      }, error => console.log(error));
  }

  close() {
    this.dialogRef.close();
  }
}
