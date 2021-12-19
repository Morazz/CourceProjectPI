import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-pick-department',
    templateUrl: './pick-department.component.html',
    styleUrls: ['./pick-department.component.css']
})

export class PickDepartmentComponent {
  public departments: Department[];
  public login: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDepartments();
    this.login = activateRoute.snapshot.params['login'];
  }

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
    }, error => console.error(error));
  }
}

export class Department {
  constructor(
    department_code: number,
    department_name: string,
    head: string) { }
}
