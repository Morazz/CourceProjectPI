import { Time } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Doctor, Patient } from '../../../doctor/doctor-coupons-list/doctor-coupons-list.component';
import { CouponTemplate } from '../../../patient/user-page/user-page.component';

@Component({
    selector: 'app-coupons-list',
    templateUrl: './coupons-list.component.html',
    styleUrls: ['./coupons-list.component.css']
})
/** coupons-list component*/
export class CouponsListComponent {
  public coupons: Coupon[];
  public user: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  public doctor: Doctor = new Doctor("", "", "", "", 0, "");

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getCoupons();
  }

  getCoupons() {
    this.http.get<Coupon[]>(this.baseUrl + 'coupon').subscribe(result => {
      this.coupons = result;
      this.coupons.forEach(coup => {
        this.http.get<Doctor>(this.baseUrl + 'doctor/' + coup.doctor_login).subscribe(result => {
          coup.doctor = result;
          this.http.get<CouponTemplate>(this.baseUrl + 'coupontemplate/' + coup.template_id).subscribe(result => {
            coup.template = result;
          }, error => console.error(error));
          this.http.get<Patient>(this.baseUrl + 'patient/' + coup.patient_login).subscribe(result => {
            coup.patient = result;
          }, error => console.error(error));
        }, error => console.error(error));
      }, error => console.error(error));
    }, error => console.error(error));
  }

  deleteCoupon(coupon_id: number) {
    this.http.delete(this.baseUrl + 'coupon', { params: new HttpParams().set('coupon_id', coupon_id.toString()) })
      .subscribe(
        (data: any) => {
          this.getCoupons();
        },
        error => console.log(error));
  }
}

export class Coupon {
  constructor(
    public coupon_id: number,
    public appointment_day: Date,
    public patient_login: string,
    public doctor_login: number,
    public template_id: number,
    public doctor: Doctor,
    public patient: Patient,
    public template: CouponTemplate) { }
}
