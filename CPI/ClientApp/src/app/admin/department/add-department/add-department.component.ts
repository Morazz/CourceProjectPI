import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Schedule } from '../../schedule/schedules-list/schedules-list.component';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
/** add-department component*/
export class AddDepartmentComponent {
  public doctors: Doctor[];
  public department: Department = new Department(0, "", new Doctor("", "", "", ""));

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
      this.router.navigate(['/departments-list']);
    }, error => console.error(error));
  }
}

//export class Doctor {
//  constructor(
//    public login: string,
//    public firstname: string,
//    public fathername: string,
//    public surname: string
//  ) { }
//}

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
    //public speciality: Speciality,
    //public department_code: Department,
    //public schedule_code: Schedule
  ) { }
}

//export class PassData {
//  constructor(
//    public login: string,
//    public password: string,
//    public status: string = "Врач"
//  ) { }
//}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}
