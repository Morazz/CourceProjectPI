import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.css']
})
/** user-page component*/
export class UserPageComponent {
  public user: Patient;
  public login: string | undefined;
  public coupons: Coupon[];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getUser(this.login);
    this.getCoupons(this.login);
  }

  getUser(login: string) {
    this.http.get<Patient>(this.baseUrl + 'patient/' + login).subscribe(result => {
      this.user = result;
    }, error => console.error(error));
  }

  getCoupons(login: string) {
    this.http.get<Coupon[]>(this.baseUrl + 'coupon/' + login).subscribe(result => {
      this.coupons = result;
    }, error => console.error(error));
  }
}

export class Patient {
  constructor(public login: string,
    firstname: string,
    fathername: string,
    surname: string,
    birthday: Date,
    gender: string,
    address: string,
    phone_number: string

  ) { }
}

export class Coupon {
  constructor(
    id: number,
    number: number,
    patient_id: string,
    doctor_id: string,
    appointment_date: Date,
    appointment_time: Time,
    cabinet: number) { }
}
