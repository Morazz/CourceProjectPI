import { Time } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../admin/patient/patients-list/patients-list.component';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.css']
})

export class UserPageComponent {
  public user: Patient = new Patient("", "", "", "", new Date(), "", "", "");
  public login: string;
  public coupons: Coupon[] = [];
  public doctor: Doctor = new Doctor("", "", "", "", 0, "");

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getUser(this.login);
    //this.getCoupons();
  }

  getUser(login: string) {
    this.http.get<Patient>(this.baseUrl + 'patient/' + login).subscribe(result => {
      this.user = result;
    }, error => console.error(error));
  }

  getCoupons() {
    this.http.get<Coupon[]>(this.baseUrl + 'coupon/valuable/' + this.login).subscribe(result => {
      this.coupons = result;
      this.coupons.forEach(coup => {
        this.getDoctorByCoup(coup.coupon_id);
        (coup as Coupon).doctor_id = this.doctor;
        console.log((coup as Coupon));
      });
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

  getDoctorByCoup(id: number) {
    this.http.get<Doctor>(this.baseUrl + 'doctor/' + id).subscribe(result => {
      this.doctor = result;
      console.log(this.doctor.login);
    }, error => console.error(error));
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
    public doctor_id: Doctor,
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
