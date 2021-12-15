import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-coupons-list',
  templateUrl: './doctor-coupons-list.component.html',
  styleUrls: ['./doctor-coupons-list.component.css']
})
/** doctor-coupons-list component*/
export class DoctorCouponsListComponent {
  public user: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  public login: string | undefined;
  public coupons: Coupon[];
  public doctor: Doctor = new Doctor("", "", "", "", 0, "");

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getCoupons(this.login);
  }

  getCoupons(login: string) {
    this.http.get<Coupon[]>(this.baseUrl + 'coupon/doctor/valuable/' + login).subscribe(result => {
      this.coupons = result;
    }, error => console.error(error));
  }
}

export class Patient {
  constructor(
    public login: string,
    firstname: string,
    fathername: string,
    surname: string,
    birthday: Date,
    gender: string,
    address: string,
    phone_number: string
  ) { }
}

export class Coupon {
  constructor(
    id: number,
    number: number,
    patient_id: string,
    doctor_id: string,
    appointment_date: Date,
    appointment_time: Time,
    cabinet: number) { }
}

export class Doctor {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public speciality: string,
    //public department_code: number,
    //public schedule_code: number
  ) { }
}
