import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})

export class AddDoctorComponent {
  public departments: Department[];
  public specialities: Speciality[];
  public doctor: Doctor = new Doctor("", "", "", "", 0, "");


  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDepartments();
    this.getSpecialities();
  }

  addDoctor() {
    console.log(this.doctor.login);
    console.log(this.doctor.firstname);
    console.log(this.doctor.fathername);
    console.log(this.doctor.surname);
    console.log(this.doctor.cabinet);
    this.http.post(this.baseUrl + 'doctor', this.doctor).subscribe(result => {
      this.router.navigate(['/doctors-list']);
    }, error => console.error(error));
  }

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
}

export class Doctor {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public speciality: string,
    //public department_code: number,
    //public schedule_code: number
  ) { }
}


export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    public head: string) { }
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}
