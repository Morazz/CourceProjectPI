import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-specialities-list',
    templateUrl: './specialities-list.component.html',
    styleUrls: ['./specialities-list.component.css']
})

export class SpecialitiesListComponent {

  public specialities: Speciality[];

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getSpecialitites();
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
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}
