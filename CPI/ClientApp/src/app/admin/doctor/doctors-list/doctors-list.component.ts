import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
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
  public coupons: Coupon[];
  public speciality: Speciality = new Speciality("", "");
  public department: Department = new Department(0, "");
  public hours: Schedule = new Schedule(0, new Date(), new Date());

  public open_filter = false;
  filter = { department: "", speciality: "" };
  public hospital_id: string;
  public isAdmin: boolean = true;

  public departments: Department[];
  public specialities: Speciality[];
  searchResult: Doctor[];

  sortedData: Doctor[];
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  dataSource: MatTableDataSource<Doctor>;
  displayedColumns: string[] = ['login', 'department', 'speciality', 'surname',
    'firstname', 'fathername', 'cabinet', 'appointment_time', 'actions'];
  displayedColumnsFull: string[] = ['hospital_id', 'login', 'department', 'speciality', 'surname',
    'firstname', 'fathername', 'cabinet', 'appointment_time', 'actions'];

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog) {
    this.login = activateRoute.snapshot.params['login'];
    this.checkStatus();
    !this.hospital_id ? this.getDoctors() : this.getHospitalDoctors();

    this.getDepartments();
    this.getSpecialities();
  }

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
    }, error => console.error(error));
  }

  getSpecialities() {
    this.http.get<Speciality[]>(this.baseUrl + 'speciality').subscribe(result => {
      this.specialities = result;
    }, error => console.error(error));
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
      });

      this.dataSource = new MatTableDataSource<Doctor>(this.doctors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
      });

      this.dataSource = new MatTableDataSource<Doctor>(this.doctors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(this.hospital_id);
      console.log(this.doctors);
    }, error => console.error(error));
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.searchResult = this.doctors.filter(doc => doc.surname.includes(text));
      this.dataSource = new MatTableDataSource<Doctor>(this.searchResult);
    }
    else this.dataSource = new MatTableDataSource<Doctor>(this.doctors);
  }

  sortData(sort: Sort) {
    const data = this.doctors;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'hospital_id':
          return this.compare(a.hospital_id, b.hospital_id, isAsc);
        case 'login':
          return this.compare(a.login, b.login, isAsc);
        case 'surname':
          return this.compare(a.surname, b.surname, isAsc);
        case 'department':
          return this.compare(a.department.department_name, b.department.department_name, isAsc);
        case 'speciality':
          return this.compare(a.speciality.speciality, b.speciality.speciality, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  openSearch() {
    this.open_filter = !this.open_filter;
  }

  nullFilter() {
    this.filter.department = "";
    this.filter.speciality = "";
    this.open_filter = !this.open_filter;
    this.dataSource = new MatTableDataSource<Doctor>(this.doctors);
  }

  findFilter() {
    console.log(this.filter);
    this.searchResult = this.doctors.filter(doc => /*doc.department != null && */doc.department.department_name.toLowerCase().includes(this.filter.department.toLowerCase())
      && doc.speciality.speciality.toLowerCase().includes(this.filter.speciality.toLowerCase()));
    console.log(this.searchResult);
    this.dataSource = new MatTableDataSource<Doctor>(this.searchResult);
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
    public hospital_id: string, 
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
