import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Schedule } from '../../schedule/schedules-list/schedules-list.component';
import { Speciality } from '../../speciality/specialities-list/specialities-list.component';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
/** add-department component*/
export class AddDepartmentComponent {
  public doctors: Doctor[];
  public department: Department = new Department(0, "", new Doctor("", "", "", "", 0));

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDoctors();
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor/nulldep').subscribe(result => {
      this.doctors = result;
    }, error => console.error(error));
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Doctor[]>(this.baseUrl + 'doctor/BySur/' + text).subscribe(result => {
        this.doctors = result;
      }, error => console.error(error));
    }
    else this.getDoctors();
  }

  addDepartment() {
    this.http.post(this.baseUrl + 'department', this.department).subscribe(result => {
      this.department.login.department_code = this.department.department_code;
      this.http.put(this.baseUrl + 'doctor', this.department.login).subscribe(result => {
        /*this.router.navigate(['/departments-list']);*/
        console.log(this.department.department_code);
      }, error => console.error(error));
    }, error => console.error(error));
  }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    public login: Doctor) { }
}

export class Doctor {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    //public cabinet: number,
    /*    public speciality_code: Speciality,*/
    public department_code: number,
    /*    public schedule_code: Schedule*/
  ) { }
}
