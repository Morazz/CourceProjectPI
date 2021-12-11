import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})

export class AddDoctorComponent {
  public departments: Department[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Department[]>(baseUrl + 'department').subscribe(result => {
      this.departments = result;
      console.log(this.departments.length);
    }, error => console.error(error));
  }

  addDoctor(item: string) {
    console.log(item);
  }
}

interface Doctor {
  login: string;
  speciality: string;
  firstname: string;
  fathername: string;
  lastname: string;
  cabinet: number;
  department_code: number;
  schedule_code: number
}


export class Department {
  constructor(
    department_code: number,
    department_name: string,
    head: string) { }
}
