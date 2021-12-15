import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-departments-list',
    templateUrl: './departments-list.component.html',
    styleUrls: ['./departments-list.component.css']
})

export class DepartmentsListComponent {
  public departments: Department[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDepartments();
  }

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
    }, error => console.error(error));
  }

  deleteDepartment(department_code: number) {
    this.http.delete(this.baseUrl + 'doctor', { params: new HttpParams().set('department_code', department_code.toString()) })
      .subscribe(
        (data: any) => {
          this.getDepartments();
        },
        error => console.log(error));
  }
}

export class Department {
  constructor(
    department_code: number,
    department_name: string,
    head: string) { }
}
