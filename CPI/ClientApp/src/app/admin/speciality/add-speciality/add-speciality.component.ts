import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-add-speciality',
    templateUrl: './add-speciality.component.html',
    styleUrls: ['./add-speciality.component.css']
})

export class AddSpecialityComponent {
  public speciality: Speciality = new Speciality("", "");
  admin: string;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialogRef: MatDialogRef<AddSpecialityComponent>) {
    this.admin = activateRoute.snapshot.params['admin'];
  }

  postData() {
    this.http.post(this.baseUrl + 'speciality', this.speciality).subscribe(result => {
      this.close();
    }, error => console.error(error));
  }

  close() {
    this.dialogRef.close();
  }
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}
