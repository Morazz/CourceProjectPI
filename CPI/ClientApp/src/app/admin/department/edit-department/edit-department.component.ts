import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-department',
    templateUrl: './edit-department.component.html',
    styleUrls: ['./edit-department.component.css']
})

export class EditDepartmentComponent {
  public admin: string;
  public doctors: Doctor[];
  public department: Department = new Department(0, "", "");
  public department_code: number;
  public doctor: Doctor = new Doctor("", "", "", "", 0);

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.department_code = activateRoute.snapshot.params['department_code'];
    this.admin = activateRoute.snapshot.params['admin'];
    this.getDepartment();
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

  getDepartment() {
    this.http.get<Department>(this.baseUrl + 'department/' + this.department_code).subscribe(result => {
      this.department = result;
      console.log(this.department);
    }, error => console.error(error));
  }

  addDepartment() {
    this.department.login = this.doctor.login;
    this.http.put(this.baseUrl + 'department', this.department).subscribe(result => {
      this.router.navigate(['/departments-list', this.admin]);
    }, error => console.error(error));
    console.log(this.doctor);
  }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    public login: string) { }
}

export class Doctor {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public department_code: number
  ) { }
}
