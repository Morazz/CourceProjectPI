import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule, MatInputModule } from '@angular/material';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
/** add-department component*/
export class AddDepartmentComponent {

  public department: Department = new Department("");
  public department_name: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialogRef: MatDialogRef<AddDepartmentComponent>) {
  }

  postData() {
    console.log(this.department);
    this.http.post<Department>(this.baseUrl + 'department', this.department).subscribe(result => {
      this.close();
    }, error => console.error(error));
  }

  close() {
    this.dialogRef.close();
  }
}

export class Department {
  constructor(
    public department_name: string) { }
}
