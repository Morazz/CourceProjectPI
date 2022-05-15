import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Schedule, Speciality } from '../admin/doctor/doctors-list/doctors-list.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddUserComponent } from '../admin/user/add-user/add-user.component';
import { AddHospitalComponent } from '../admin/hospital/add-hospital/add-hospital.component';
import { Hospital } from '../admin/hospital/hospitals-list/hospitals-list.component';
import { DeleteDialogComponent } from '../admin/delete-dialog/delete-dialog.component';
import { hosp_type } from '../../globals';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public hospitals: Hospital[];
  public doctors: Doctor[];
  public schedule: Schedule[];
  public hosp_type: string[] = hosp_type;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string,
              private dialog: MatDialog  ) {
    //this.getDoctors();
    //this.getDepartments();
    //this.openDialog();
    this.getHospitals();
  }

  getHospitals() {
    this.http.get<Hospital[]>(this.baseUrl + 'hospital').subscribe(result => {
      this.hospitals = result;
      this.hospitals.forEach(hp => {
        this.http.get<Schedule>(this.baseUrl + 'schedule/' + hp.schedule_code).subscribe(result => {
          hp.hours = result;
          console.log(result);
        }, error => console.error(error));
      })
      console.log(this.hospitals);
    }, error => console.error(error));
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '25%';
  }

  //getDepDoctors(dep_code: number) {
  //  this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
  //    this.doctors = result;
  //    this.doctors.forEach(doc => {
  //      this.http.get<Department>(this.baseUrl + 'department/' + doc.department_code).subscribe(result => {
  //        doc.department = result;
  //      }, error => console.error(error));
  //      this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
  //        doc.speciality = result;
  //      }, error => console.error(error));
  //      this.http.get<Schedule>(this.baseUrl + 'schedule/' + doc.schedule_code).subscribe(result => {
  //        doc.hours = result;
  //      }, error => console.error(error));
  //    })
  //  }, error => console.error(error));
  //  this.departments.forEach(dep => dep.doctors = this.doctors.filter(doc => doc.department_code != null && doc.department_code == dep.department_code));
  //  //return this.doctors.filter(doc => doc.department_code == dep_code);
  //}

  //getDoctors() {
  //  this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
  //    this.doctors = result;
  //    this.doctors.forEach(doc => {
  //      this.http.get<Department>(this.baseUrl + 'department/' + doc.department_code).subscribe(result => {
  //        doc.department = result;
  //      }, error => console.error(error));
  //      this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
  //        doc.speciality = result;
  //      }, error => console.error(error));
  //      this.http.get<Schedule>(this.baseUrl + 'schedule/' + doc.schedule_code).subscribe(result => {
  //        doc.hours = result;
  //      }, error => console.error(error));
  //    })
  //  }, error => console.error(error));
    
  //}

  //getDepartments() {
  //  this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
  //    this.departments = result;
  //    this.departments.forEach(dep => dep.doctors = this.doctors.filter(doc => doc.department_code != null && doc.department_code == dep.department_code));
  //    this.departments = this.departments.filter(dep => dep.doctors.length > 0);
  //  }, error => console.error(error));

  //}
}

