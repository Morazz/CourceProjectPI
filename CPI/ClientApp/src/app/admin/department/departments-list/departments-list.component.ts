import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../doctor/doctors-list/doctors-list.component';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})

export class DepartmentsListComponent {
  public departments: Department[];
  public admin: string;
  public department: Department = new Department(0, "", "", null);

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDepartments();
    this.admin = activateRoute.snapshot.params['admin'];
  }

  getDepartments() {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe(result => {
      this.departments = result;
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
            console.log(doc);
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
}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    head: string,
    public doctors: Doctor[]) { }
}
