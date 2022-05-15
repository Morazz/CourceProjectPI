import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { dialogConfig } from '../../../../globals';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { AddSpecialityComponent } from '../add-speciality/add-speciality.component';
import { EditSpecialityComponent } from '../edit-speciality/edit-speciality.component';

@Component({
  selector: 'app-specialities-list',
  templateUrl: './specialities-list.component.html',
  styleUrls: ['./specialities-list.component.css']
})

export class SpecialitiesListComponent {
  public login: string;
  public specialities: Speciality[];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog) {
    this.getSpecialitites();
    this.login = activateRoute.snapshot.params['login '];
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
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null)
        this.http.delete(this.baseUrl + 'speciality', { params: new HttpParams().set('speciality_code', code) })
          .subscribe(
            (data: any) => {
              this.getSpecialitites();
            },
            error => console.log(error));
    });
  }

  openDialog(parameter: string, speciality ?: Speciality) {
      switch(parameter) {
      case 'AddSpeciality': {
      const dialogRef = this.dialog.open(AddSpecialityComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        this.getSpecialitites();
      });
      break;
    }
      case 'EditSpeciality': {
      dialogConfig.data = speciality;
      const dialogRef = this.dialog.open(EditSpecialityComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        this.getSpecialitites();
      });
      break;
    }
    }
}
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}
