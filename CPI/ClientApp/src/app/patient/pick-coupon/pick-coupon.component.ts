import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../../admin/schedule/schedules-list/schedules-list.component';

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
  doctor: Doctor = new Doctor("", "", "", "", 0, new Schedule(0, new Date(), new Date()), []);
  patient: Patient = new Patient("");
  doctorFreeCoupons: Coupon[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getCoupons();
    this.newCoupon.doctor_login = activateRoute.snapshot.params['doctor_login'];
    this.newCoupon.patient_login = activateRoute.snapshot.params['login'];
    this.getDoctor();
  }

  getCoupons() {
    this.http.get<CouponTemplate[]>(this.baseUrl + 'coupontemplate').subscribe(result => {
      this.coupons = result;
    }, error => console.error(error));
  }

  getDoctor() {
    this.http.get<Doctor>(this.baseUrl + 'doctor/' + this.newCoupon.doctor_login).subscribe(result => {
      this.doctor = result;
      this.http.get<Schedule>(this.baseUrl + 'schedule/' + this.doctor.schedule_code).subscribe(result => {
        this.doctor.schedule = result;
      }, error => console.error(error));
      this.http.get<Coupon[]>(this.baseUrl + 'coupon/doc/' + this.doctor.login).subscribe(result => {
        this.doctor.coupons = result;
        console.log(this.doctor);
      }, error => console.error(error));
    }, error => console.error(error));
  }

  checkCoupon() {

    this.doctorFreeCoupons = this.doctor.coupons.filter(cp => new Date(cp.appointment_day).setHours(0, 0, 0, 0) == new Date(this.selectedDate).setHours(0, 0, 0, 0));

    this.freeCoupons = this.coupons
      .filter(coupon => coupon.time > this.doctor.schedule.appointment_start && coupon.time < this.doctor.schedule.appointment_end)
      .filter(coupon => !this.doctorFreeCoupons.find(coup => coup.template_id == coupon.template_id));
  }

  pickCoupon() {
    this.http.post(this.baseUrl + 'coupon', this.newCoupon)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/user-page', this.newCoupon.patient_login]);
        }, error => console.log(error));
    console.log(this.selectedDate);
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
    public login: string,
    public firstname: string,
    public surname: string,
    public fathername: string,
    public schedule_code: number,
    public schedule: Schedule,
    public coupons: Coupon[]
  ) { }
}

export class Patient {
  constructor(
    public login: string) { }
}
