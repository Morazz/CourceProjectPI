import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { profile_placeholder } from '../../../globals';
import { Doctor } from '../../admin/doctor/doctors-list/doctors-list.component';
import { Hospital } from '../../admin/hospital/hospitals-list/hospitals-list.component';
import { Schedule } from '../../admin/schedule/schedules-list/schedules-list.component';
import { Speciality } from '../../admin/speciality/specialities-list/specialities-list.component';
import { Department } from '../../moderator/department/departments-list/departments-list.component';



@Component({
  selector: 'app-hospital-info',
  templateUrl: './hospital-info.component.html',
  styleUrls: ['./hospital-info.component.css'],
  encapsulation: ViewEncapsulation.None,
})
/** hospital-info component*/
export class HospitalInfoComponent {   
  /** hospital-info ctor */
  public login: string;
  public doctors: Doctor[];
  public hospital_id: string;
  public hospital: Hospital;
  public specialities: Speciality[];
  public filtered_doctors: Doctor[]/* = []*/;
  public authorized: boolean = true;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string) {

    this.hospital_id = activateRoute.snapshot.params['hospital_id'];
    this.login = activateRoute.snapshot.params['login'];
    this.login ? this.authorized : !this.authorized;
    this.getHospital();
    this.getDoctors();
    this.getSpecialitites();
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

  getSpecialitites() {
    this.http.get<Speciality[]>(this.baseUrl + 'speciality').subscribe(result => {
      this.specialities = result;
    }, error => console.error(error));
  }

  filterDoctors(selectedValue: string) {
    console.log(selectedValue);
    this.filtered_doctors = this.doctors.filter(doc => doc.speciality_code == selectedValue);
    console.log(this.filtered_doctors);
  }
}
