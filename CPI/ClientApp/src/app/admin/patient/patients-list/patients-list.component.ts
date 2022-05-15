import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { dialogConfig } from '../../../../globals';
import { Coupon } from '../../coupon/coupons-list/coupons-list.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html',
    styleUrls: ['./patients-list.component.css']
})

export class PatientsListComponent {
  public admin: string;
  public patients: Patient[];
  public open_filter = false;
  public patient: Patient = new Patient("", null, null, null, null, null, null, null, null);
  ascLogin = false;
  ascSurname = false;
  ascGender = false;
  filter = { login: "", gender: "", address: ""};

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog  ) {
    this.admin = activateRoute.snapshot.params['admin'];
    this.getPatients();
  }

  getPatients() {
    this.http.get<Patient[]>(this.baseUrl + 'patient').subscribe(result => {
      this.patients = result;
    }, error => console.error(error));
  }

  deletePatient(login: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {

        this.http.get<Patient>(this.baseUrl + 'patient/' + login).subscribe(result => {
          this.patient = result;
          this.http.get<Coupon[]>(this.baseUrl + 'coupon/pat/' + login).subscribe(result => {
            this.patient.coupons = result;
          }, error => console.error(error));
        }, error => console.error(error));

        if (this.patient.coupons != null) {
          this.patient.coupons.forEach(coup => {
            this.http.delete(this.baseUrl + 'coupon', { params: new HttpParams().set('coupon_id', coup.coupon_id.toString()) })
              .subscribe(result => console.log(coup));
          });
        }

        this.patient.coupons = null;

        this.http.delete(this.baseUrl + 'patient', { params: new HttpParams().set('login', login) })
          .subscribe(
            result => {
              this.http.delete(this.baseUrl + 'passdata', { params: new HttpParams().set('login', login) })
                .subscribe(
                  result => {
                    this.getPatients();
                  },
                  error => console.log(error));
            },
            error => console.log(error));
      }
    });
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Patient[]>(this.baseUrl + 'patient/BySec/' + text).subscribe(result => {
        this.patients = result;
      }, error => console.error(error));
    }
    else this.getPatients();
  }

  openSearch() {
    this.open_filter = !this.open_filter;
  }

  nullFilter() {
    this.filter.login = "";
    this.filter.gender = "";
    this.filter.address = "";
    this.getPatients();
    this.open_filter = !this.open_filter;
  }

  findFilter() {
    this.patients = this.patients.filter(pat => pat.login.toLowerCase().includes(this.filter.login.toLowerCase())
      && pat.address.includes(this.filter.address)
      && pat.gender == this.filter.gender);
  }

  sortLogin() {
    if (this.ascLogin) {
      this.patients.sort((pat1, pat2) => pat1.login.localeCompare(pat2.login));
      this.ascLogin = !this.ascLogin;
    }
    else {
      this.patients.sort((pat1, pat2) => pat1.login.localeCompare(pat2.login)).reverse();
      this.ascLogin = !this.ascLogin;
    }
  }

  sortSurname() {
    if (this.ascSurname) {
      this.patients.sort((pat1, pat2) => pat1.login.localeCompare(pat2.login));
      this.ascSurname = !this.ascSurname;
    }
    else {
      this.patients.sort((pat1, pat2) => pat1.login.localeCompare(pat2.login)).reverse();
      this.ascSurname = !this.ascSurname;
    }
  }

  sortGender() {
    if (this.ascGender) {
      this.patients.sort((pat1, pat2) => pat1.gender.localeCompare(pat2.gender));
      this.ascSurname = !this.ascSurname;
    }
    else {
      this.patients.sort((pat1, pat2) => pat1.gender.localeCompare(pat2.gender)).reverse();
      this.ascGender = !this.ascGender;
    }
  }
}

export class Patient {
  constructor(public login: string,
    firstname: string,
    fathername: string,
    public surname: string,
    birthday: Date,
    public gender: string,
    public address: string,
    phone_number: string,
    public coupons: Coupon[]
  ) { }
}
