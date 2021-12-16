import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent {
  public doctors: Doctor[];


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDoctors();
  }

  deleteDoctor(login: string) {
    this.http.delete(this.baseUrl + 'doctor', { params: new HttpParams().set('login', login) })
      .subscribe(
        (data: any) => {
          this.getDoctors();
        },
        error => console.log(error));
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {
        this.http.get<Speciality>(this.baseUrl + 'doctor/spec/' + doc.login).subscribe(result => {
          //doc.speciality_code = result;
          
        }, error => console.error(error));
        //console.log(doc.speciality_code);
      })
    }, error => console.error(error));
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Doctor[]>(this.baseUrl + 'passdata/BySur/' + text).subscribe(result => {
        this.doctors = result;
      }, error => console.error(error));
    }
    else this.getDoctors();
  }
}

//interface Doctor {
//  login: string;
//  speciality: string;
//  firstname: string;
//  fathername: string;
//  lastname: string;
//  cabinet: number;
//  department_code: number;
//  schedule_code: number
//}

export class Schedule {
  constructor(
    public schedule_code: string,
    public appointment_start: Date) { }
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}

export class Doctor {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public speciality_code: Speciality,
    public department_code: Department,
    public schedule_code: Schedule
  ) { }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string) { }
}
