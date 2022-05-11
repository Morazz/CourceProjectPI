import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../doctor/doctors-list/doctors-list.component';
import { dialogConfig } from '../../../../globals';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})

export class DepartmentsListComponent {
  public departments: Department[];
  public doctors: Doctor[];
  public login: string;
  public department: Department = new Department(0, "", "", null, null);

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog) {
    this.getDepartments();
    this.login = activateRoute.snapshot.params['login'];
  }

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
      this.getDoctors();
    }, error => console.error(error));
  }

  getDoctors() {
    this.http.get<Doctor[]>(this.baseUrl + 'doctor').subscribe(result => {
      this.doctors = result;

      this.departments.forEach(dep => {
        this.http.get<Doctor>(this.baseUrl + 'doctor/' + dep.head).subscribe(result => {
          dep.headName = result;
          console.log(dep.headName);
        }, error => console.error(error));
      });
    }, error => console.error(error));
  }

  deleteDepartment(department_code: number) {
    if (confirm("Подтвердите удаление: " + department_code)) {

      this.http.get<Department>(this.baseUrl + 'department/' + department_code).subscribe(result => {
        this.department = result;
        this.http.get<Doctor[]>(this.baseUrl + 'doctor/dep/' + department_code).subscribe(result => {
          this.department.doctors = result;
        }, error => console.error(error));
      })

      if (this.department.doctors != null) {
        this.department.doctors.forEach(doc => {
          doc.department_code = null;
          this.http.put(this.baseUrl + 'doctor', doc).subscribe(result => {
          }, error => console.error(error));
        });
      }

      this.department.doctors = null;

      console.log(this.department);

      this.http.delete(this.baseUrl + 'department', { params: new HttpParams().set('department_code', department_code.toString()) })
        .subscribe(
          (data: any) => {
            this.getDepartments();
          },
          error => console.log(error));
    }
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Department[]>(this.baseUrl + 'department/ByName/' + text).subscribe(result => {
        this.departments = result;
      }, error => console.error(error));
    }
    else this.getDepartments();
  }

  openDialog(parameter: string) {

    switch (parameter) {
      case 'AddDepart': {
        const dialogRef = this.dialog.open(AddDepartmentComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getDepartments();
        });
        break;
      }
      case 'EditDepart': {
        const dialogRef = this.dialog.open(EditDepartmentComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getDepartments();
        });
        break;
      }
    }
  }
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    public head: string,
    public headName: Doctor,
    public doctors: Doctor[]) { }
}
