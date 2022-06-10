import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../doctor/doctors-list/doctors-list.component';
import { dialogConfig } from '../../../../globals';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})

export class DepartmentsListComponent {
  public departments: Department[];
  public doctors: Doctor[];
  public login: string;
  public department: Department = new Department(0, "");

  sortedData: Department[];
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  dataSource: MatTableDataSource<Department>;
  displayedColumns: string[] = ['department_name', 'actions'];

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog) {
    this.getDepartments();
    this.login = activateRoute.snapshot.params['login'];
  }

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
      this.dataSource = new MatTableDataSource<Department>(this.departments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => console.error(error));
  }

  deleteDepartment(department_code: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {

        this.http.delete(this.baseUrl + 'department', { params: new HttpParams().set('department_code', department_code.toString()) })
          .subscribe(
            (data: any) => {
              this.getDepartments();
            },
            error => console.log(error));
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.departments;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'department_name':
          return this.compare(a.department_name, b.department_name, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Department[]>(this.baseUrl + 'department/ByName/' + text).subscribe(result => {
        this.departments = result;
      }, error => console.error(error));
    }
    else this.getDepartments();
  }

  openDialog(parameter: string, depart?: Department) {

    switch (parameter) {
      case 'AddDepartment': {
        const dialogRef = this.dialog.open(AddDepartmentComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getDepartments();
        });
        break;
      }
      case 'EditDepartment': {
        dialogConfig.data = depart;
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
    public department_name: string) { }
}
