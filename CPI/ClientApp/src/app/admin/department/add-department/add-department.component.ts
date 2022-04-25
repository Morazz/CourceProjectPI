import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
/** add-department component*/
export class AddDepartmentComponent {
  public admin: string;
  public doctors: Doctor[];
  public department: Department = new Department(0, "", new Doctor("", "", "", "", 0));
  public department_name: string;
  public head: string;
  public doctor: Doctor = new Doctor("", "", "", "", 0);

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.admin = activateRoute.snapshot.params['admin'];
    this.getDoctors();
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor/nulldep').subscribe(result => {
      this.doctors = result;
    }, error => console.error(error));
  }

  getDoctor() {
    this.http.get<Doctor>(this.baseUrl + 'doctor/' + this.head).subscribe(result => {
      this.doctor = result;
      console.log(this.doctor);
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
    this.department.department_name = this.department_name;
    this.department.head = this.head;
    this.getDoctor();
    this.http.post<Department>(this.baseUrl + 'department', this.department).subscribe(result => {
      this.doctor.department_code = result.department_code;
      this.http.put(this.baseUrl + 'doctor', this.doctor).subscribe(result => {

      }, error => console.error(error));
    }, error => console.error(error));
    this.router.navigate(['/departments-list', this.admin]);
    console.log(this.department);
  }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    /*public login: Doctor*/
    public head: string ) { }
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
