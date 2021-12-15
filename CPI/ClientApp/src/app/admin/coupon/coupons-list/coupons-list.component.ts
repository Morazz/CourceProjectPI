import { Time } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-coupons-list',
    templateUrl: './coupons-list.component.html',
    styleUrls: ['./coupons-list.component.css']
})
/** coupons-list component*/
export class CouponsListComponent {
  public coupons: Coupon[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getCoupons();
  }

  getCoupons() {
    this.http.get<Coupon[]>(this.baseUrl + 'coupon').subscribe(result => {
      this.coupons = result;
      console.log(this.coupons.length);
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
    public patient_id: string,
    public doctor_id: string,
    public appointment_date: Date,
    //public appointment_time: Time,
    //public cabinet: number) { }
  ) { }
}
