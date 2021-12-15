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
  freeCoupons: CouponTemplate[];
  selectedDate: Date;
  doctor: Doctor = new Doctor("", "", "", "", 0, "");
  newCoupon: Coupon = new Coupon(0, "", "", new Date(), new CouponTemplate(0, new Date));

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getCoupons();

    this.doctor.login = activateRoute.snapshot.params['doctor_login'];
    this.newCoupon.doctor_id = activateRoute.snapshot.params['doctor_login'];
    this.newCoupon.patient_id = activateRoute.snapshot.params['login'];
  }

  getCoupons() {
    this.http.get<CouponTemplate[]>(this.baseUrl + 'coupontemplate').subscribe(result => {
      this.coupons = result;
    }, error => console.error(error));
  }

  checkCoupon() {
    this.freeCoupons = [];
    this.coupons.forEach(coupon => {
      this.http.get<CouponTemplate[]>(this.baseUrl + 'coupon/' + this.newCoupon.doctor_id + "/" + this.selectedDate.toLocaleDateString() + "/" + coupon.template_id).subscribe(result => {
        if (result) {
          this.freeCoupons.push(coupon);
        }
      }, error => console.error(error));
    });
  }

  getTime() {
    this.http.get<CouponTemplate>(this.baseUrl + 'coupontemplate/time/' + this.newCoupon.appointment_time.time).subscribe(result => {
      if (result) {
        
        this.newCoupon.appointment_time = result;
        console.log(this.newCoupon.appointment_time.template_id);
      }
    }, error => console.error(error));
  }

  pickCoupon() {
    console.log(this.newCoupon.appointment_time.template_id);
/*    console.log(this.newCoupon.appointment_time.time);*/
    this.http.post(this.baseUrl + 'coupon', this.newCoupon)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/user-page', this.newCoupon.patient_id]);
        }, error => console.log(error));
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
    public patient_id: string,
    public doctor_id: string,
    public appointment_date: Date,
    public appointment_time: CouponTemplate) { }
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

export class Patient {
  constructor(
    login: string,
    firstname: string,
    fathername: string,
    surname: string,
    birthday: Date,
    gender: string,
    address: string,
    phone_number: string) { }
}
