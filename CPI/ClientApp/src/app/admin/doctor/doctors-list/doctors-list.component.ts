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
