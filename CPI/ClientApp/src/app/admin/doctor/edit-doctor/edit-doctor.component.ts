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
  public login: string;
  public departments: Department[];
  public specialities: Speciality[];
  public schedules: Schedule[];
  public docSpeciality: Speciality = new Speciality("", "");
  public docDepartment: Department = new Department(0, "");
  public docSchedule: Schedule = new Schedule(0, new Date(), new Date());
  public doctor: Doctor = new Doctor("", "", "", "", 1, 0, 0, "");

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
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
      console.log(this.doctor.surname);
    }, error => console.error(error));
  }

  addDoctor() {
    this.getSpeciality();
    this.getDepartment();
    this.getSchedule();
    this.http.put(this.baseUrl + 'doctor', this.doctor)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/doctors-list']);
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
    this.http.get<Department>(this.baseUrl + 'department/' + this.docDepartment.department_code).subscribe(result => {
      this.doctor.department_code = result.department_code;
    }, error => console.error(error));
  }

  getSpeciality() {
    this.http.get<Speciality>(this.baseUrl + 'speciality/' + this.docSpeciality.speciality_code).subscribe(result => {
      this.doctor.speciality_code = result.speciality_code;
    }, error => console.error(error));
  }

  getSchedule() {
    this.http.get<Schedule>(this.baseUrl + 'schedule/' + this.docSchedule.schedule_code).subscribe(result => {
      this.doctor.schedule_code = result.schedule_code;
    }, error => console.error(error));
  }
}

