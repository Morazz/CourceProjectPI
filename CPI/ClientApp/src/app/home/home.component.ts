import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Schedule, Speciality } from '../admin/doctor/doctors-list/doctors-list.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddTemplateComponent } from '../admin/coupon-template/add-template/add-template.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public departments: Department[];
  public doctors: Doctor[];
  public schedule: Schedule[];

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string,
              private dialog: MatDialog  ) {
    //this.getDoctors();
    //this.getDepartments();
    this.openDialog();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.minWidth = '25%'; 

    this.dialog.open(AddTemplateComponent, dialogConfig);
  }

  getDepDoctors(dep_code: number) {
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
    this.departments.forEach(dep => dep.doctors = this.doctors.filter(doc => doc.department_code != null && doc.department_code == dep.department_code));
    //return this.doctors.filter(doc => doc.department_code == dep_code);
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
      this.departments.forEach(dep => dep.doctors = this.doctors.filter(doc => doc.department_code != null && doc.department_code == dep.department_code));
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
