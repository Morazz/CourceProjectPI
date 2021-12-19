import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
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

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.code = activateRoute.snapshot.params['speciality_code'];
    this.admin = activateRoute.snapshot.params['admin'];
    this.getSpeciality(this.code);
  }

  postData() {
    this.http.put(this.baseUrl + 'speciality', this.speciality).subscribe(result => {
      this.router.navigate(['/specialities-list', this.admin]);
    }, error => console.error(error));
  }

  getSpeciality(code: string) {
    this.http.get<Speciality>(this.baseUrl + 'speciality/' + code).subscribe(result => {
      this.speciality = result;
    }, error => console.error(error));
  }
}

export class Speciality {
  constructor(
    public speciality_code: string,
    public speciality: string) { }
}
