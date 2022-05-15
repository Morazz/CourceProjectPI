import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-speciality',
    templateUrl: './edit-speciality.component.html',
    styleUrls: ['./edit-speciality.component.css']
})

export class EditSpecialityComponent {
  public speciality: Speciality = new Speciality("", "");
  public code: string;
  public admin: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<EditSpecialityComponent>  ) {
    this.getSpeciality(data);
  }

  postData() {
    this.http.put(this.baseUrl + 'speciality', this.speciality).subscribe(result => {
      this.close();
    }, error => console.error(error));
  }

  getSpeciality(code: string) {
    this.http.get<Speciality>(this.baseUrl + 'speciality/' + code).subscribe(result => {
      this.speciality = result;
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
