import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../admin/doctor/doctors-list/doctors-list.component';
import { Hospital } from '../../admin/hospital/hospitals-list/hospitals-list.component';
import { Schedule } from '../../admin/schedule/schedules-list/schedules-list.component';
import { Speciality } from '../../admin/speciality/specialities-list/specialities-list.component';
import { Department } from '../../moderator/department/departments-list/departments-list.component';


@Component({
  selector: 'app-hospital-info',
  templateUrl: './hospital-info.component.html',
  styleUrls: ['./hospital-info.component.css']
})
/** hospital-info component*/
export class HospitalInfoComponent {   
  /** hospital-info ctor */

  public doctors: Doctor[];
  public hospital_id: string;
  public hospital: Hospital;
  public nophoto: string = "/assets/images/nophoto.jpg";

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string) {

    this.hospital_id = activateRoute.snapshot.params['hospital_id'];
    this.getHospital();
    this.getDoctors();
  }

  getHospital() {
    this.http.get<Hospital>(this.baseUrl + 'hospital/' + this.hospital_id).subscribe(result => {
      this.hospital = result;
    }, error => console.error(error));
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor/hosp/' + this.hospital_id).subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {
        this.http.get<Department>(this.baseUrl + 'department/' + doc.department_code).subscribe(result => {
          doc.department = result;
        }, error => console.error(error));

        this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
          doc.speciality = result;
        }, error => console.error(error));

        this.http.get<Schedule>(this.baseUrl + 'schedule/' + doc.schedule_code).subscribe(result => {
          doc.hours = result;
        }, error => console.error(error));
      })
    }, error => console.error(error));
  }
}
