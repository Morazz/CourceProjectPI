import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-departments-list',
    templateUrl: './departments-list.component.html',
    styleUrls: ['./departments-list.component.css']
})

export class DepartmentsListComponent {
  public departments: Department[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Department[]>(baseUrl + 'department').subscribe(result => {
      this.departments = result;
    }, error => console.error(error));
  }
}

interface Department {
  department_code: number;
  department_name: string;
  head: string;
}
