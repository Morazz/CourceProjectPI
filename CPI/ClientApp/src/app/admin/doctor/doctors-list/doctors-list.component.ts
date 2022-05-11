import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Scheduler } from 'rxjs';
import { dialogConfig, roles } from '../../../../globals';
import { Coupon } from '../../../patient/pick-coupon/pick-coupon.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { Moderator } from '../../moderator/add-moderator/add-moderator.component';
import { PassData } from '../../user/add-user/add-user.component';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent {
  public login: string;
  public doctors: Doctor[];
  public filtered: Doctor[];
  public coupons: Coupon[];
  public speciality: Speciality = new Speciality("", "");
  public department: Department = new Department(0, "");
  public hours: Schedule = new Schedule(0, new Date(), new Date());
  ascLogin = false;
  ascSur = false;
  ascDep = false;
  ascSpec = false;
  public open_filter = false;
  filter = { department: "", speciality: "" };
  public hospital_id: string;
  public isAdmin: boolean = true;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog) {
    this.login = activateRoute.snapshot.params['login'];
    this.checkStatus();
    !this.hospital_id ? this.getDoctors() : this.getHospitalDoctors();
  }

  checkStatus() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.login).subscribe(result => {
      result.status == roles[2] ? this.isAdmin : this.isAdmin = !this.isAdmin;
      !this.isAdmin ? this.setHospital() : this.getDoctors();
        
    }, error => console.error(error));
  }

  setHospital() {
    this.http.get<Moderator>(this.baseUrl + 'moderator/' + this.login).subscribe(result => {
      this.hospital_id = result.hospital_id;
      this.getHospitalDoctors();
    }, error => console.error(error));
  }

  deleteDoctor(login: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {

        this.http.get<Coupon[]>(this.baseUrl + 'coupon/doc/' + login).subscribe(result => {
          this.coupons = result;
          this.coupons.forEach(coup => {
            this.http.delete(this.baseUrl + 'coupon', { params: new HttpParams().set('coupon_id', coup.coupon_id.toString()) })
              .subscribe(
                (data: any) => {
                },
                error => console.log(error));
          })
        }, error => console.error(error));

        this.http.delete(this.baseUrl + 'doctor', { params: new HttpParams().set('login', login) })
          .subscribe(
            (data: any) => {
              this.getDoctors();
            },
            error => console.log(error));
      }
    });
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {
        this.http.get<Department>(this.baseUrl + 'department/' + doc.department_code).subscribe(result => {
          doc.department = result;
        }, error => console.error(error));

        this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
          doc.speciality = result;
        }, error => console.error(error));

        this.http.get<Schedule>(this.baseUrl + 'schedule/' + doc.schedule_code).subscribe(result => {
          doc.hours = result;
        }, error => console.error(error));
      })
    }, error => console.error(error));
  }

  getHospitalDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor/hosp/' + this.hospital_id).subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {
        this.http.get<Department>(this.baseUrl + 'department/' + doc.department_code).subscribe(result => {
          doc.department = result;
        }, error => console.error(error));

        this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
          doc.speciality = result;
        }, error => console.error(error));

        this.http.get<Schedule>(this.baseUrl + 'schedule/' + doc.schedule_code).subscribe(result => {
          doc.hours = result;
        }, error => console.error(error));
      })
    }, error => console.error(error));
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.doctors = this.doctors.filter(doc => doc.surname.includes(text));
    }
    else this.getDoctors();
  }

  sortLogin() {
    if (this.ascLogin) {
      this.doctors.sort((doc1, doc2) => doc1.login.localeCompare(doc2.login));
      this.ascLogin = !this.ascLogin;
    }
    else {
      this.doctors.sort((doc1, doc2) => doc1.login.localeCompare(doc2.login)).reverse();
      this.ascLogin = !this.ascLogin;
    }
  }


  sortSurname() {
    if (this.ascSur) {
      this.doctors.sort((doc1, doc2) => doc1.surname.localeCompare(doc2.surname));
      this.ascSur = !this.ascSur;
    }
    else {
      this.doctors.sort((doc1, doc2) => doc1.surname.localeCompare(doc2.surname)).reverse();
      this.ascSur = !this.ascSur;
    }
  }

  sortDepartment() {
    //if (this.ascDep) {
    //  this.ascDep = !this.ascDep;
    //  this.doctors.sort(function (doc1, doc2) {
    //    return (doc1.department_code === null) - (doc2.department_code === null)
    //      || +(doc1.department.department_name.localeCompare(doc2.department.department_name) == 1)
    //      || -(doc1.department.department_name.localeCompare(doc2.department.department_name) == -1);
    //  });
    //}
    //else {
    //  this.ascDep = !this.ascDep;
    //  this.doctors.sort(function (doc1, doc2) {
    //    return (doc1.department_code === null) - (doc2.department_code === null)
    //      || -(doc1.department.department_name.localeCompare(doc2.department.department_name) == 1)
    //      || +(doc1.department.department_name.localeCompare(doc2.department.department_name) == -1);
    //  });
    //}
  }

  sortSpeciality() {
    if (this.ascSpec) {
      this.doctors.sort((doc1, doc2) => doc1.speciality.speciality.localeCompare(doc2.speciality.speciality));
      this.ascSpec = !this.ascSpec;
    }
    else {
      this.doctors.sort((doc1, doc2) => doc1.speciality.speciality.localeCompare(doc2.speciality.speciality)).reverse();
      this.ascSpec = !this.ascSpec;
    }
  }


  openSearch() {
    this.open_filter = !this.open_filter;
  }

  nullFilter() {
    this.filter.department = "";
    this.filter.speciality = "";
    this.getDoctors();
    this.open_filter = !this.open_filter;
  }

  findFilter() {
    this.doctors = this.doctors.filter(doc => doc.department != null && doc.department.department_name.toLowerCase().includes(this.filter.department.toLowerCase())
      && doc.speciality.speciality.toLowerCase().includes(this.filter.speciality.toLowerCase()));
  }
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}

export class Doctor {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public department_code: number,
    public schedule_code: number,
    public speciality_code: string,
    public speciality: Speciality,
    public department: Department,
    public hours: Schedule
  ) { }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string) { }
}
