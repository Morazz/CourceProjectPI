import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent {
  public admin: string;
  public user: PassData = new PassData("", "", "");
  roles: string[] = ["Пациент", "Врач", "Администратор", "Модератор"];
  public login: string = "";
  password: string;
  status: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<EditUserComponent>) {
    this.login = activateRoute.snapshot.params['login'];
    this.getUser(data);
  }

  getUser(login: string) {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + login).subscribe(result => {
      this.user = result;
    }, error => console.error(error));
  }

  postData() {
    this.http.put(this.baseUrl + 'passdata', this.user)
      .subscribe(result => {
        this.close();
      }, error => console.log(error));
  }

  close() {
    this.dialogRef.close();
  }
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status: string
  ) { }
}
