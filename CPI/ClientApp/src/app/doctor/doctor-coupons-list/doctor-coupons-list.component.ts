import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponTemplate } from '../../patient/user-page/user-page.component';

@Component({
  selector: 'app-doctor-coupons-list',
  templateUrl: './doctor-coupons-list.component.html',
  styleUrls: ['./doctor-coupons-list.component.css']
})
/** doctor-coupons-list component*/
export class DoctorCouponsListComponent {
  public user: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  public login: string;
  public coupons: Coupon[];
  public doctor: Doctor = new Doctor("", "", "", "", 0, "");

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getCoupons(this.login);
    this.doctor.login = this.login;
  }

  getCoupons(login: string) {
    this.http.get<Coupon[]>(this.baseUrl + 'coupon/doctor/valuable/' + login).subscribe(result => {
      this.coupons = result;
      this.coupons.forEach(coup => {
        this.http.get<Patient>(this.baseUrl + 'patient/' + coup.patient_login).subscribe(result => {
          coup.patient = result;
          console.log(coup.patient.login);
          this.http.get<CouponTemplate>(this.baseUrl + 'coupontemplate/' + coup.template_id).subscribe(result => {
            coup.template = result;
          }, error => console.error(error));
        });
      }, error => console.error(error));
    }, error => console.error(error));
  }
}

export class Patient {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public birthday: Date,
    public gender: string,
    public address: string,
    public phone_number: string
  ) { }
}

export class Coupon {
  constructor(
    public coupon_id: number,
    public appointment_day: Date,
    public patient_login: string,
    public doctor_login: number,
    public template_id: number,
    public patient: Patient,
    public template: CouponTemplate) { }
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
