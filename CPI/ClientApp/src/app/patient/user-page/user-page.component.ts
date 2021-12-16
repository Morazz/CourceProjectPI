import { Time } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Speciality } from '../../admin/doctor/doctors-list/doctors-list.component';
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
  public doctor: Doctor = new Doctor("", "", "", 0, "", new Speciality("", ""));

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getUser(this.login);
    this.getCoupons();
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
        this.http.get<Doctor>(this.baseUrl + 'doctor/' + coup.doctor_login).subscribe(result => {
          coup.doctor = result;
          console.log(coup.doctor.fathername);
          this.http.get<Speciality>(this.baseUrl + 'speciality/' + coup.doctor.speciality_code).subscribe(result => {
            coup.doctor.speciality = result;
          }, error => console.error(error));
          this.http.get<CouponTemplate>(this.baseUrl + 'coupontemplate/' + coup.template_id).subscribe(result => {
            coup.template = result;
          }, error => console.error(error));
        }, error => console.error(error));
      }, error => console.error(error));
    });
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
    public appointment_day: Date,
    public patient_login: string,
    public doctor_login: number,
    public template_id: number,
    public doctor: Doctor,
    public template: CouponTemplate) { }
}

export class Doctor {
  constructor(
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public speciality_code: string,
    public speciality: Speciality
  ) { }
}
