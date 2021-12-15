import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-pick-coupon',
  templateUrl: './pick-coupon.component.html',
  styleUrls: ['./pick-coupon.component.css']
})

export class PickCouponComponent {
  coupons: CouponTemplate[];
  freeCoupons: CouponTemplate[];
  selectedDate: Date;
  doctor: Doctor = new Doctor("", "", "", "", 0, "");

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getCoupons();
    this.doctor.login = activateRoute.snapshot.params['doctor_login'];
  }

  getCoupons() {
    this.http.get<CouponTemplate[]>(this.baseUrl + 'coupontemplate').subscribe(result => {
      this.coupons = result;
    }, error => console.error(error));
  }

  checkCoupon() {
    this.coupons.forEach(coupon => {
      this.http.get<CouponTemplate[]>(this.baseUrl + 'coupon/' + this.doctor.login + "/" + this.selectedDate.toLocaleDateString() + "/" + coupon.template_id).subscribe(result => {
        if (result != null) {
          this.freeCoupons.push(coupon);
        }
      }, error => console.error(error));
      console.log(this.selectedDate.toLocaleDateString());
      
    });
  }
}


export class CouponTemplate {
  constructor(
    public template_id: number,
    public time: Date) { }
}

export class Coupon {
  constructor(
    public coupon_id: number,
    public number: number,
    public patient_id: string,
    public doctor_id: string,
    public appointment_date: Date,
    public appointment_time: Time,
    public cabinet: number) { }
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
