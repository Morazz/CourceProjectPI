import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Schedule, Speciality } from '../admin/doctor/doctors-list/doctors-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public departments: Department[];
  public doctors: Doctor[];
  public schedule: Schedule[];

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string) {
    this.getDoctors();
    this.getDepartments();
  }

  getDepDoctors(dep_code: number) {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {
        this.http.get<Department>(this.baseUrl + 'department/' + doc.department_code).subscribe(result => {
          doc.department = result;
        }, error => console.error(error));
        this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
          doc.speciality = result;
        }, error => console.error(error));
        this.http.get<Schedule>(this.baseUrl + 'schedule/' + doc.schedule_code).subscribe(result => {
          doc.hours = result;
        }, error => console.error(error));
      })
    }, error => console.error(error));
    this.departments.forEach(dep => dep.doctors = this.doctors.filter(doc => doc.department_code == dep.department_code));
    //return this.doctors.filter(doc => doc.department_code == dep_code);
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {
        this.http.get<Department>(this.baseUrl + 'department/' + doc.department_code).subscribe(result => {
          doc.department = result;
        }, error => console.error(error));
        this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
          doc.speciality = result;
        }, error => console.error(error));
        this.http.get<Schedule>(this.baseUrl + 'schedule/' + doc.schedule_code).subscribe(result => {
          doc.hours = result;
        }, error => console.error(error));
      })
    }, error => console.error(error));
    //return this.doctors.filter(doc => doc.department_code == dep_code);
  }

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
      this.departments.forEach(dep => dep.doctors = this.doctors.filter(doc => doc.department_code == dep.department_code));
      this.departments = this.departments.filter(dep => dep.doctors.length > 0);
    }, error => console.error(error));

  }

  //public user: PassData = new PassData("", "", "");
  //roles: string[] = ["Пациент", "Врач", "Администратор"];
  //public login: string;
  //public password: string;
  //errors: string[] = [];

  //constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  //authorize() {
  //  this.http.get<PassData>(this.baseUrl + 'passdata/' + this.user.login).subscribe(result => {
  //    this.errors = [];
  //    if (result != null) {
  //      this.user = result;
  //      if (this.user.password != this.password)
  //        this.errors.push("Неверный пароль");
  //      else
  //        this.redirect();
  //    }
  //    else this.errors.push("Пользователь с таким именем не существует");
  //  }, error => console.error(error));
  //}

  //redirect() {
  //  console.log(this.user.status);
  //  switch (this.user.status) {
  //    case "Пациент": {
  //      this.router.navigate(['user-page', this.user.login]);
  //    }
  //      break;
  //    case "Врач": {

  //      this.router.navigate(['doctor-info', this.user.login]);
  //    }
  //      break;
  //    case "Администратор": {
  //      this.router.navigate(['admin-panel', this.user.login]);
  //    }
  //      break;
  //  }
  //}
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    public doctors: Doctor[]) { }
}
