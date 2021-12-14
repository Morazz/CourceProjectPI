import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pick-doctor',
  templateUrl: './pick-doctor.component.html',
  styleUrls: ['./pick-doctor.component.css']
})

export class PickDoctorComponent {

  public doctors: Doctor[];
  department: Department = new Department(0, "", "");
  public department_code: number;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.department_code = activateRoute.snapshot.params['department_code'];
    this.getDepartment(this.department_code);
    this.http.get<Doctor[]>(this.baseUrl + 'doctor/dep/' + this.department_code).subscribe(result => {
      this.doctors = result;
    }, error => console.error(error));
  }

  getDepartment(code: number) {
    this.http.get<Department>(this.baseUrl + 'department/' + this.department_code).subscribe(result => {
      this.department = result;
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
    department_code: number,
    department_name: string,
    head: string) { }
}
