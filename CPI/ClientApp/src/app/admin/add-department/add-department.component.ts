import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
/** add-department component*/
export class AddDepartmentComponent {
  public doctors: Doctor[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDoctors();
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
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
