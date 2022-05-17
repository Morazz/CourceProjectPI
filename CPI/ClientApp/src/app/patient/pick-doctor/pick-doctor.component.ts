import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Speciality, Schedule } from '../../admin/doctor/doctors-list/doctors-list.component';
import { Doctor, Department } from '../../hospital/hospital-schedules/hospital-schedules.component';

@Component({
  selector: 'app-pick-doctor',
  templateUrl: './pick-doctor.component.html',
  styleUrls: ['./pick-doctor.component.css']
})

export class PickDoctorComponent {
  public login: string;
  public doctors: Doctor[];
  public departments: Department[];

  public hospital_id: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.hospital_id = activateRoute.snapshot.params['hospital_id'];
    this.login = activateRoute.snapshot.params['login'];
    //this.getDepartment(this.department_code);
    this.getDepartments(this.hospital_id);

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

      });

      this.departments.forEach(dep => {
        dep.doctors = this.doctors.filter(doc => doc.department_code == dep.department_code);
      });

      this.departments = this.departments.filter(dep => dep.doctors.length > 0);
    }, error => console.error(error));
  }

  getDepartments(hospital_id: string) {
    this.http.get<Department[]>(this.baseUrl + 'department/hosp/' + hospital_id).subscribe(result => {
      this.departments = result;
      this.getDoctors();
      this.departments.forEach(dep => {
        console.log(this.doctors);
      });
    }, error => console.error(error));
  }

  //getDepartment(code: number) {
  //  this.http.get<Department>(this.baseUrl + 'department/' + this.department_code).subscribe(result => {
  //    this.department = result;
  //  }, error => console.error(error));
  //}
}


