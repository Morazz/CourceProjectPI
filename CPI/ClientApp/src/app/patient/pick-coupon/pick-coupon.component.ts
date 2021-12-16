import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pick-coupon',
  templateUrl: './pick-coupon.component.html',
  styleUrls: ['./pick-coupon.component.css']
})

export class PickCouponComponent {
  coupons: CouponTemplate[];
  freeCoupons: CouponTemplate[] = [];
  selectedDate: Date;
  newCoupon: Coupon = new Coupon(0, new Date(), "", "", 0);
  doctor: Doctor = new Doctor("");
  patient: Patient = new Patient("");

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getCoupons();
    this.newCoupon.doctor_login = activateRoute.snapshot.params['doctor_login'];
    this.newCoupon.patient_login = activateRoute.snapshot.params['login'];

    console.log(this.newCoupon.doctor_login + " " + this.newCoupon.patient_login);
  }

  getCoupons() {
    this.http.get<CouponTemplate[]>(this.baseUrl + 'coupontemplate').subscribe(result => {
      this.coupons = result;
    }, error => console.error(error));
  }

  checkCoupon() {
    this.freeCoupons = [];
    this.coupons.forEach(coupon => {
      this.http.get<CouponTemplate[]>(this.baseUrl + 'coupon/' + this.newCoupon.doctor_login + "/" + this.selectedDate.toLocaleDateString() + "/" + coupon.template_id).subscribe(result => {
        if (result) {
          this.freeCoupons.push(coupon);
        }
      }, error => console.error(error));
    });
  }

  pickCoupon() {
    //this.http.post(this.baseUrl + 'coupon', this.newCoupon)
    //  .subscribe(
    //    (data: any) => {
    //      this.router.navigate(['/user-page', this.newCoupon.patient_login]);
    //    }, error => console.log(error));
    console.log(this.doctor);
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
    public appointment_day: Date,
    public patient_login: string,
    public doctor_login: string,
    public template_id: number) { }
}

export class Doctor {
  constructor(
    public login: string
  ) { }
}

export class Patient {
  constructor(
    public login: string) { }
}
