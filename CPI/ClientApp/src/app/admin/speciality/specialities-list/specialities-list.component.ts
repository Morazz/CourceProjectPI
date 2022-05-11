import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { dialogConfig } from '../../../../globals';
import { AddSpecialityComponent } from '../add-speciality/add-speciality.component';

@Component({
    selector: 'app-specialities-list',
    templateUrl: './specialities-list.component.html',
    styleUrls: ['./specialities-list.component.css']
})

export class SpecialitiesListComponent {
  public admin: string;
  public specialities: Speciality[];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog  ) {
    this.getSpecialitites();
    this.admin = activateRoute.snapshot.params['admin'];
  }

  getSpecialitites() {
    this.http.get<Speciality[]>(this.baseUrl + 'speciality').subscribe(result => {
      this.specialities = result;
    }, error => console.error(error));
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<Speciality[]>(this.baseUrl + 'speciality/ByCode/' + text).subscribe(result => {
        this.specialities = result;
      }, error => console.error(error));
    }
    else this.getSpecialitites();
  }

  deleteSpeciality(code: string) {
    if (confirm("Подтвердите удаление: " + code)) {
      this.http.delete(this.baseUrl + 'speciality', { params: new HttpParams().set('speciality_code', code) })
        .subscribe(
          (data: any) => {
            this.getSpecialitites();
          },
          error => console.log(error));
    }
  }

  openDialog() {
    this.dialog.open(AddSpecialityComponent, dialogConfig);
  }
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}
