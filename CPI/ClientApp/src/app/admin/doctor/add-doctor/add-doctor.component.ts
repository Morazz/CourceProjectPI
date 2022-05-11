import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { roles } from '../../../../globals';
import { Hospital } from '../../hospital/hospitals-list/hospitals-list.component';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})

export class AddDoctorComponent {
  public admin: string;
  public login: string;
  public departments: Department[];
  public specialities: Speciality[];
  public schedules: Schedule[];
  public hospitals: Hospital[];
  public docSpeciality: Speciality = new Speciality("", "");
  public docDepartment: Department = new Department(null, "");
  public docSchedule: Schedule = new Schedule(1, new Date(), new Date());
  public doctor: Doctor = new Doctor("", "", "", "", "", 1, null, null, "", "", "", "");
  public newPass: PassData = new PassData("", "");
  errors: string[] = [];
  imageUrl: SafeUrl;
  public isAdmin: boolean = true;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private sanitizer: DomSanitizer) {
    this.login = activateRoute.snapshot.params['admin'];
    console.log(this.login);
    this.checkStatus();
    this.getDepartments();
    this.getSpecialities();
    this.getSchedules();
    this.getHospitals();
  }

  addDoctor() {
    this.getSpeciality();
    this.getDepartment();
    this.getSchedule();
    this.doctor.speciality_code = this.docSpeciality.speciality_code;
    this.doctor.department_code = <number>(this.docDepartment.department_code);
    this.doctor.schedule_code = <number>(this.docSchedule.schedule_code);
    this.newPass.login = this.doctor.login;

    console.log(this.doctor);

    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.newPass.login)
      .subscribe(
        result => {
          this.errors = [];
          if (result != null)
            this.errors.push("Пользователь с таким логином уже существует");
          else
            this.http.post(this.baseUrl + 'passdata', this.newPass)
              .subscribe(
                result => {
                  this.http.post(this.baseUrl + 'doctor', this.doctor)
                    .subscribe(
                      result => {
                        this.router.navigate(['/doctors-list', this.login]);
                      }, error => console.log(error));
                }, error => console.log(error));
            console.log(this.doctor);
        }, error => console.log(error));
  };

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
    }, error => console.error(error));
  }

  getHospitals() {
    this.http.get<Hospital[]>(this.baseUrl + 'hospital').subscribe(result => {
      this.hospitals = result;
    }, error => console.error(error));
  }

  getSpecialities() {
    this.http.get<Speciality[]>(this.baseUrl + 'speciality').subscribe(result => {
      this.specialities = result;
    }, error => console.error(error));
  }

  getSchedules() {
    this.http.get<Schedule[]>(this.baseUrl + 'schedule').subscribe(result => {
      this.schedules = result;
    }, error => console.error(error));
  }

  getDepartment() {
    if (this.docDepartment.department_code != null)
      this.http.get<Department>(this.baseUrl + 'department/' + this.docDepartment.department_code).subscribe(result => {
        this.docDepartment = result;
      }, error => console.error(error));
  }

  getSpeciality() {
    this.http.get<Speciality>(this.baseUrl + 'speciality/' + this.docSpeciality.speciality_code).subscribe(result => {
      this.docSpeciality = result;
    }, error => console.error(error));
  }

  getSchedule() {
    this.http.get<Schedule>(this.baseUrl + 'schedule/' + this.docSchedule.schedule_code).subscribe(result => {
      this.docSchedule = result;
    }, error => console.error(error));
  }

  checkStatus() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.login).subscribe(result => {
      result.status == roles[2] ? this.isAdmin : this.isAdmin = !this.isAdmin;
      console.log(this.isAdmin);
    }, error => console.error(error));
  }

  onImageChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.doctor.photo = reader.result as string;
      };
    }
  }
}


export class Doctor {
  constructor(
    public hospital_id: string,
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public department_code: number,
    public schedule_code: number,
    public speciality_code: string,
    public photo: string,
    public education: string,
    public regards: string
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
    public department_name: string) { }
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
