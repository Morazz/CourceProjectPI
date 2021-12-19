import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scheduler } from 'rxjs';
import { Coupon } from '../../../patient/pick-coupon/pick-coupon.component';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent {
  public admin: string;
  public doctors: Doctor[];
  public filtered: Doctor[];
  public coupons: Coupon[];
  public speciality: Speciality = new Speciality("", "");
  public department: Department = new Department(0, "");
  public hours: Schedule = new Schedule(0, new Date(), new Date());
  ascLogin: boolean = true;
  ascSur: boolean = true;
  ascDep: boolean = true;
  public open_filter = false;
  filter = {department: "", speciality: ""};

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string) {
    this.getDoctors();
    this.admin = activateRoute.snapshot.params['admin'];
  }

  deleteDoctor(login: string) {
    if (confirm("Подтвердите удаление: " + login)) {

      this.http.get<Coupon[]>(this.baseUrl + 'coupon/doc/' + login).subscribe(result => {
        this.coupons = result;
        this.coupons.forEach(coup => {
          this.http.delete(this.baseUrl + 'coupon', { params: new HttpParams().set('coupon_id', coup.coupon_id.toString()) })
            .subscribe(
              (data: any) => {
              },
              error => console.log(error));
        })
      }, error => console.error(error));

      this.http.delete(this.baseUrl + 'doctor', { params: new HttpParams().set('login', login) })
        .subscribe(
          (data: any) => {
            this.getDoctors();
          },
          error => console.log(error));
    }
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
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.doctors = this.doctors.filter(doc => doc.surname.includes(text));
    }
    else this.getDoctors();
  }

  //sortLogin() {
  //  this.doctors.sort(doc => doc.login).reverse();
  //}

  //sortSurname() {
  //  this.doctors.sort(doc => doc.surname).reverse();
  //}

  //sortDepartment() {
  //  this.doctors.sort((d1, d2) => {
  //    return d1.department.department_name.localeCompare(d2.department.department_name);
  //  }).reverse();
  //}

  //sortSpeciality() {
  //  this.doctors.sort(doc => doc.speciality.speciality).reverse();
  //}

  openSearch() {
    this.open_filter = !this.open_filter;
  }

  nullFilter() {
    this.filter.department = "";
    this.filter.speciality = "";
    this.getDoctors();
    this.open_filter = !this.open_filter;
  }

  findFilter() {
    this.doctors = this.doctors.filter(doc => doc.department != null && doc.department.department_name.toLowerCase().includes(this.filter.department.toLowerCase())
      && doc.speciality.speciality.toLowerCase().includes(this.filter.speciality.toLowerCase()));
  }
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
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
    public department_code: number,
    public schedule_code: number,
    public speciality_code: string,
    public speciality: Speciality,
    public department: Department,
    public hours: Schedule
  ) { }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string) { }
}
