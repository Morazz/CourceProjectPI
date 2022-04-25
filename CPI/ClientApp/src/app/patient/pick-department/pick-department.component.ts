import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../admin/doctor/doctors-list/doctors-list.component';
import { Schedule } from '../../admin/schedule/schedules-list/schedules-list.component';
import { Speciality } from '../../admin/speciality/specialities-list/specialities-list.component';

@Component({
    selector: 'app-pick-department',
    templateUrl: './pick-department.component.html',
    styleUrls: ['./pick-department.component.css']
})

export class PickDepartmentComponent {
  public departments: Department[];
  public login: string;
  public doctors: Doctor[];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDoctors();
    this.getDepartments();
    this.login = activateRoute.snapshot.params['login'];
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
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

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
      this.departments.forEach(dep => dep.doctors = this.doctors.filter(doc => doc.department_code == dep.department_code));
      this.departments = this.departments.filter(dep => dep.doctors.length > 0);
    }, error => console.error(error));

  }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    public doctors: Doctor[]) { }
}
