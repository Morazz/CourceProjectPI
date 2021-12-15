import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
/** doctor-info component*/
export class DoctorInfoComponent {
  doctor: Doctor = new Doctor("", "", "", "", 0, new Speciality("", ""),
    new Department(0, "", ""), new Schedule(0, new Date(), new Date()));
  public login: string | undefined;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getDoctor(this.login);
  }

  getDoctor(login: string) {
    this.http.get<Doctor>(this.baseUrl + 'doctor/' + login).subscribe(result => {
      this.doctor = result;
    }, error => console.error(error));
  }

  getDepartment() {

  }

  getSpeciality() {

  }

  getSchedule() {

  }
}

export class Doctor {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public speciality: Speciality,
    public department: Department,
    public schedule: Schedule
  ) { }
}

export class Department {
  constructor(
    department_code: number,
    department_name: string,
    head: string) { }
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}
