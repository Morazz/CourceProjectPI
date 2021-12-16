import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Doctor, Speciality, Schedule } from '../../admin/doctor/doctors-list/doctors-list.component';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})

export class DoctorInfoComponent {
  doctor: Doctor = new Doctor("", "", "", "", 0, 0, 0, "", null, null, null);
  public login: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getDoctor(this.login);
  }

  getDoctor(login: string) {
    this.http.get<Doctor>(this.baseUrl + 'doctor/' + login).subscribe(result => {
      this.doctor = result;

      this.http.get<Department>(this.baseUrl + 'department/' + this.doctor.department_code).subscribe(result => {
        this.doctor.department = result;
      }, error => console.error(error));

      this.http.get<Speciality>(this.baseUrl + 'speciality/' + this.doctor.speciality_code).subscribe(result => {
        this.doctor.speciality = result;
      }, error => console.error(error));

      this.http.get<Schedule>(this.baseUrl + 'schedule/' + this.doctor.schedule_code).subscribe(result => {
        this.doctor.hours = result;
      }, error => console.error(error));
    }, error => console.error(error));
  }

  getDepartment() {

  }

  getSpeciality() {

  }

  getSchedule() {

  }
}
