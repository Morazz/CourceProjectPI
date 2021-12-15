import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Schedule } from '../../schedule/schedules-list/schedules-list.component';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})

export class AddDoctorComponent {
  public departments: Department[];
  public specialities: Speciality[];
  public doctor: Doctor = new Doctor("", "", "", "", 0, new Speciality("", ""), new Department(0, "", ""), new Schedule(0, new Date(), new Date()));
  public user: PassData = new PassData("", "", "Врач");


  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDepartments();
    this.getSpecialities();
  }

  addDoctor(login: string, password: string) {
    this.http.post(this.baseUrl + 'passdata', new PassData(login, this.user.password,))
      .subscribe(
        result => {
          this.http.post(this.baseUrl + 'doctor', this.doctor)
            .subscribe(
              (data: any) => {
                this.router.navigate(['/patients-list']);
              }, error => console.log(error));
        }, error => console.log(error));
  };

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
    }, error => console.error(error));
  }

  getSpecialities() {
    this.http.get<Speciality[]>(this.baseUrl + 'speciality').subscribe(result => {
      this.specialities = result;
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
    public speciality_code: Speciality,
    public department_code: Department,
    public schedule_code: Schedule
  ) { }
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status: string = "Врач"
  ) { }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    public head: string) { }
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}
