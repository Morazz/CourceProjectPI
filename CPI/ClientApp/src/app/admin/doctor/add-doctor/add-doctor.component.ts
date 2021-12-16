import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})

export class AddDoctorComponent {
  public departments: Department[];
  public specialities: Speciality[];
  public schedules: Schedule[];
  public docSpeciality: Speciality = new Speciality("", "");
  public docDepartment: Department = new Department(0, "", null);
  public docSchedule: Schedule = new Schedule(0, new Date(), new Date());
  public doctor: Doctor = new Doctor("", "", "", "", 0, this.docSpeciality, this.docDepartment, null);
  public user: PassData = new PassData("", "", "Врач");


  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDepartments();
    this.getSpecialities();
    this.getSchedules();
  }

  addDoctor() {
    //this.getDepartment();
    //this.getSpeciality();
    this.doctor.department_code = this.docDepartment.department_code;
    this.doctor.speciality_code = this.docSpeciality.speciality_code;
    this.doctor.schedule_code = this.docSchedule.schedule_code;
    //this.doctor.department_code = this.docDepartment;
    //this.getDepartment(this.docDepartment.department_code);
    //this.getSpeciality(this.docSpeciality.speciality);
    console.log(this.doctor.speciality_code);
    console.log(this.doctor.schedule_code);
    console.log(this.doctor.department_code);

    this.http.post(this.baseUrl + 'passdata', new PassData(this.doctor.login, this.user.password))
      .subscribe(
        result => {
          this.http.post(this.baseUrl + 'doctor', this.doctor)
            .subscribe(
              (data: any) => {
                this.router.navigate(['/doctors-list']);
              }, error => console.log(error));
        }, error => console.log(error));
  };

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
    }, error => console.error(error));
  }

  getDepartment() {
    this.http.get<Department>(this.baseUrl + 'department/' + this.docDepartment.department_code).subscribe(result => {
      this.doctor.department_code = result.department_code;
      //console.log(this.doctor.department_code.department_code + " :   " + this.doctor.department_code.department_name + " : " + this.doctor.department_code.head);
    }, error => console.error(error));
  }

  getSpecialities() {
    this.http.get<Speciality[]>(this.baseUrl + 'speciality').subscribe(result => {
      this.specialities = result;
    }, error => console.error(error));
  }

  getSpeciality() {
    this.http.get<Speciality>(this.baseUrl + 'speciality/' + this.docSpeciality.speciality_code).subscribe(result => {
      this.doctor.speciality_code = result.speciality_code;
      //console.log(this.doctor.speciality_code.speciality_code + " " + this.doctor.speciality_code.speciality);
    }, error => console.error(error));
  }

  getSchedules() {
    this.http.get<Schedule[]>(this.baseUrl + 'schedule').subscribe(result => {
      this.schedules = result;
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
    public speciality_code: string,
    public department_code: number,
    public schedule_code: number
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

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}
