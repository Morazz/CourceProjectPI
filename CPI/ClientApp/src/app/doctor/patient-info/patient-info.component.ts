import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../admin/patient/patients-list/patients-list.component';
import { Coupon, CouponTemplate, Doctor } from '../../patient/user-page/user-page.component';

@Component({
    selector: 'app-patient-info',
    templateUrl: './patient-info.component.html',
    styleUrls: ['./patient-info.component.css']
})
/** patient-info component*/
export class PatientInfoComponent {
  public user: Patient = new Patient("", "", "", "", new Date(), "", "", "", []);
  public coupons: Coupon[] = [];
  public login: string;
  public doctor: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['patient'];
    this.doctor = activateRoute.snapshot.params['doctor'];
    this.getUser(this.login);
    this.getCoupons();
  }

  getUser(login: string) {
    this.http.get<Patient>(this.baseUrl + 'patient/' + login).subscribe(result => {
      this.user = result;
    }, error => console.error(error));
  }

  getCoupons() {
    this.http.get<Coupon[]>(this.baseUrl + 'coupon/doctor/valuable/' + this.doctor + '/' + this.login).subscribe(result => {
      this.coupons = result;
      this.coupons.forEach(coup => {
          this.http.get<CouponTemplate>(this.baseUrl + 'coupontemplate/' + coup.template_id).subscribe(result => {
            coup.template = result;
            console.log(coup);
          }, error => console.error(error));
        }, error => console.error(error));
    });
  }
}
