import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from '../../hospital/hospitals-list/hospitals-list.component';

@Component({
  selector: 'app-add-moderator',
  templateUrl: './add-moderator.component.html',
  styleUrls: ['./add-moderator.component.css']
})
/** add-moderator component*/
export class AddModeratorComponent {
  public hospitals: Hospital[];
  public moderator: Moderator = new Moderator("", "");
  public newPass: PassData = new PassData("", "");
  errors: string[] = [];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialogRef: MatDialogRef<AddModeratorComponent>) {
    this.getHospitals();
  }

  getHospitals() {
    this.http.get<Hospital[]>(this.baseUrl + 'hospital').subscribe(result => {
      this.hospitals = result;
    }, error => console.error(error));
  }

  close() {
    this.dialogRef.close();
  }

  postData() {
    this.newPass.login = this.moderator.login;

    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.newPass.login)
      .subscribe(
        result => {
          this.errors = [];
          if (result != null)
            this.errors.push("Пользователь с таким логином уже существует");
          else
            this.http.post(this.baseUrl + 'passdata', this.newPass)
              .subscribe(
                result => {
                  this.http.post(this.baseUrl + 'moderator', this.moderator)
                    .subscribe(
                      result => {
                        this.close();
                      }, error => console.log(error));
                }, error => console.log(error));
        }, error => console.log(error));
  }
}

export class Moderator {
  constructor(
    public login: string,
    public hospital_id: string
  ) { }
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status: string = "Модератор"
  ) { }
}
