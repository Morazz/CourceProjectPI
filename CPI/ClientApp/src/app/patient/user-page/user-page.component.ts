import { Time } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { dialogConfig, roles } from '../../../globals';
import { DeleteDialogComponent } from '../../admin/delete-dialog/delete-dialog.component';
import { Speciality } from '../../admin/doctor/doctors-list/doctors-list.component';
import { Hospital } from '../../admin/hospital/hospitals-list/hospitals-list.component';
import { Patient } from '../../admin/patient/patients-list/patients-list.component';
import { PassData } from '../../admin/user/add-user/add-user.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent {
  public user: Patient = new Patient("", "", "", "", new Date(), "", "", "", []);
  public login: string;
  public coupons: Coupon[] = [];
 // public doctor: Doctor = new Doctor("", "", "", 0, "", new Speciality("", ""));
  public isUser: boolean = true;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog  ) {
    //this.login = activateRoute.snapshot.params['login'];
    this.login = activateRoute.snapshot.queryParamMap.get('login');
    this.getUser(this.login);
    this.getCoupons();


  }

  checkStatus() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.login).subscribe(result => {
      result.status == roles[0] ? this.isUser : this.isUser = !this.isUser;
      console.log(this.isUser);
      console.log(result.status);
    }, error => console.error(error));
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
          this.http.get<Speciality>(this.baseUrl + 'speciality/' + coup.doctor.speciality_code).subscribe(result => {
            coup.doctor.speciality = result.speciality;
          }, error => console.error(error));
          this.http.get<CouponTemplate>(this.baseUrl + 'coupontemplate/' + coup.template_id).subscribe(result => {
            coup.template = result;
            this.sortByDueDate();
          }, error => console.error(error));
          this.http.get<Hospital>(this.baseUrl + 'hospital/' + coup.doctor.hospital_id).subscribe(result => {
            coup.hospital = result.hospital_name;
          }, error => console.error(error));
        }, error => console.error(error));
      }, error => console.error(error));
    });

  }

  public sortByDueDate(): void {
    this.coupons.sort((a: Coupon, b: Coupon) => {
      let d1 = new Date(a.appointment_day);
      d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), new Date(a.template.time).getHours(), new Date(a.template.time).getMinutes());
      let d2 = new Date(b.appointment_day);
      d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), new Date(b.template.time).getHours(), new Date(b.template.time).getMinutes());
      return d1.getTime() - d2.getTime();
    });
    
  }

  deleteCoupon(coupon_id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.http.delete(this.baseUrl + 'coupon', { params: new HttpParams().set('coupon_id', coupon_id.toString()) })
          .subscribe(
            (data: any) => {
              this.getCoupons();
            },
            error => console.log(error));
      }
    });
  }

  //getDoctorByCoup(id: number) {
  //  this.http.get<Doctor>(this.baseUrl + 'doctor/' + id).subscribe(result => {
  //    this.doctor = result;
  //  }, error => console.error(error));
  //}
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
    public template: CouponTemplate,
    public hospital:string) { }
}

export class Doctor {
  constructor(
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public speciality_code: string,
    public speciality: string,
    public hospital_id: string
  ) { }
}
