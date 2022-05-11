import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../doctor/add-doctor/add-doctor.component';
import { Schedule } from '../../schedule/schedules-list/schedules-list.component';
import { dialogConfig } from '../../../../globals';
import { AddHospitalComponent } from '../add-hospital/add-hospital.component';
import { MatDialog } from '@angular/material';
import { EditHospitalComponent } from '../edit-hospital/edit-hospital.component';

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
    //this.hospitals.forEach(hp => {
    //  this.http.get<Schedule>(this.baseUrl + 'doctor/' + hp.).subscribe(result => {
    //    hp.hospital_schedule = result;
    //  }, error => console.error(error));
    //});
  }

  deleteHospital(hospital_id: string) {
    if (confirm("Подтвердите удаление: " + hospital_id)) {

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
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Hospital[]>(this.baseUrl + 'hospital/ByName/' + text).subscribe(result => {
        this.hospitals = result;
      }, error => console.error(error));
    }
    else this.getHospitals();
  }

  openDialog(parameter: string) {
    switch (parameter) {
      case 'AddHosp': this.dialog.open(AddHospitalComponent, dialogConfig); break;
      case 'EditHosp': this.dialog.open(EditHospitalComponent, dialogConfig); break;
    }
  }
}

export class Hospital {
  constructor(
    public hospital_id: string,
    public hospital_name: string,
    public hospital_address: string,
    public schedule_code: number,
    public doctors: Doctor[],
    public hours: Schedule) { }
}
