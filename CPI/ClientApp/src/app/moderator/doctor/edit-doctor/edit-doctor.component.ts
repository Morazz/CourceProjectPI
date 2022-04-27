import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Doctor, Schedule, Speciality } from '../add-doctor/add-doctor.component';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})

export class EditDoctorComponent {
  public admin: string;
  public login: string;
  public departments: Department[];
  public specialities: Speciality[];
  public schedules: Schedule[];
  public docSpeciality: Speciality = new Speciality("", "");
  public docDepartment: Department = new Department(null, "");
  public docSchedule: Schedule = new Schedule(0, new Date(), new Date());
  public doctor: Doctor = new Doctor("", "", "", "", 1, 1, 1, "");

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.admin = activateRoute.snapshot.params['admin'];
    this.login = activateRoute.snapshot.params['login'];
    this.getDepartments();
    this.getSpecialities();
    this.getSchedules();
    this.getDoctor(this.login);
  }

  getDoctor(login: string) {
    this.http.get<Doctor>(this.baseUrl + 'doctor/' + login).subscribe(result => {
      if (result != null)
        this.doctor = result;
    }, error => console.error(error));
  }

  addDoctor() {
    this.getSpeciality();
    this.getDepartment();
    this.getSchedule();
    this.doctor.speciality_code = this.docSpeciality.speciality_code;
    this.doctor.department_code = <number>(this.docDepartment.department_code);
    this.doctor.schedule_code = <number>(this.docSchedule.schedule_code);
    console.log(this.doctor);
    this.http.put(this.baseUrl + 'doctor', this.doctor)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/doctors-list', this.admin]);
        }, error => console.log(error));
  };

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
    }, error => console.error(error));
  }

  getSpecialities() {
    this.http.get<Speciality[]>(this.baseUrl + 'speciality').subscribe(result => {
      this.specialities = result;
    }, error => console.error(error));
  }

  getSchedules() {
    this.http.get<Schedule[]>(this.baseUrl + 'schedule').subscribe(result => {
      this.schedules = result;
    }, error => console.error(error));
  }

  getDepartment() {
    if (this.docDepartment.department_code != null)
    this.http.get<Department>(this.baseUrl + 'department/' + this.docDepartment.department_code).subscribe(result => {
      this.docDepartment = result;
    }, error => console.error(error));
  }

  getSpeciality() {
    this.http.get<Speciality>(this.baseUrl + 'speciality/' + this.docSpeciality.speciality_code).subscribe(result => {
      this.docSpeciality = result;
    }, error => console.error(error));
  }

  getSchedule() {
    this.http.get<Schedule>(this.baseUrl + 'schedule/' + this.docSchedule.schedule_code).subscribe(result => {
      this.docSchedule = result;
    }, error => console.error(error));
  }
}

