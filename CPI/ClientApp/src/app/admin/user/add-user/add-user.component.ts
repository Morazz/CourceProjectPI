import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})

export class AddUserComponent {
  public admin: string;
  roles: string[] = ["Пациент", "Врач", "Администратор", "Модератор"];
  user: PassData = new PassData("", "", "");

  constructor(private activateRoute: ActivatedRoute, private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialogRef: MatDialogRef<AddUserComponent>) {
    this.admin = activateRoute.snapshot.params['admin'];
  }

  postData() {
    this.http.post(this.baseUrl + 'passdata', this.user)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/users-list', this.admin]);
        }, error => console.log(error));
  }

  close() {
    this.dialogRef.close();
  }
}

export class PassData {
  constructor(public login: string, public password: string, public status: string) { }
}
