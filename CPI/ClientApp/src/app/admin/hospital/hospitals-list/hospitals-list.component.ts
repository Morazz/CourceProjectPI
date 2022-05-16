import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../doctor/add-doctor/add-doctor.component';
import { Schedule } from '../../schedule/schedules-list/schedules-list.component';
import { dialogConfig } from '../../../../globals';
import { AddHospitalComponent } from '../add-hospital/add-hospital.component';
import { MatDialog } from '@angular/material';
import { EditHospitalComponent } from '../edit-hospital/edit-hospital.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-hospitals-list',
  templateUrl: './hospitals-list.component.html',
  styleUrls: ['./hospitals-list.component.scss']
})
/** hospitals-list component*/
export class HospitalsListComponent {
  public hospitals: Hospital[];
  public hospital: Hospital;
  public admin: string;
  public schedule: Schedule = new Schedule(0, null, null);

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog) {
    this.getHospitals();
    this.admin = activateRoute.snapshot.params['admin'];
  }

  getHospitals() {
    this.http.get<Hospital[]>(this.baseUrl + 'hospital').subscribe(result => {
      this.hospitals = result;
      this.getSchedules();
    }, error => console.error(error));
  }

  ///
  getSchedules() {
    this.hospitals.forEach(hp => {
      this.http.get<Schedule>(this.baseUrl + 'schedule/' + hp.schedule_code).subscribe(result => {
        hp.hours = result;
        console.log(hp.hours);
      }, error => console.error(error));
    });
  }

  deleteHospital(hospital_id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {

        this.http.get<Hospital>(this.baseUrl + 'hospital/' + hospital_id).subscribe(result => {
          this.hospital = result;
          this.http.get<Doctor[]>(this.baseUrl + 'doctor/hosp/' + hospital_id).subscribe(result => {
            this.hospital.doctors = result;
          }, error => console.error(error));
        })

        ///
        if (this.hospital.doctors != null) {
          this.hospital.doctors.forEach(doc => {
            //doc.hospital_id = null;
            this.http.put(this.baseUrl + 'doctor', doc).subscribe(result => {
              console.log(doc);
            }, error => console.error(error));
          });
        }

        this.http.delete(this.baseUrl + 'hospital', { params: new HttpParams().set('id', hospital_id.toString()) })
          .subscribe(
            (data: any) => {
              this.getHospitals();
            },
            error => console.log(error));
      }
    });
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Hospital[]>(this.baseUrl + 'hospital/ByName/' + text).subscribe(result => {
        this.hospitals = result;
      }, error => console.error(error));
    }
    else this.getHospitals();
  }

  openDialog(parameter: string, hospital?: string) {
    switch (parameter) {
      case 'AddHosp': {
        const dialogRef = this.dialog.open(AddHospitalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getHospitals();
        });
      }
      break;
      case 'EditHosp': {
        dialogConfig.data = hospital;
        const dialogRef = this.dialog.open(EditHospitalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getHospitals();
        });
      }
      break;
    }
  }
}

export class Hospital {
  constructor(
    public hospital_id: string,
    public hospital_name: string,
    public hospital_address: string,
    public schedule_code: number,
    public hospital_type: string,
    public doctors: Doctor[],
    public hours: Schedule) { }
}
