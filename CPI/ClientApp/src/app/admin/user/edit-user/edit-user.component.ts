import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent {
  public admin: string;
  public user: PassData;
  roles: string[] = ["Пациент", "Врач", "Администратор"];
  login: string | undefined;
  password: string;
  status: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.admin = activateRoute.snapshot.params['admin'];
    this.getUser(this.login);
  }

  getUser(login: string) {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + login).subscribe(result => {
      this.user = result;
    }, error => console.error(error));
  }

  postData() {
    this.http.put(this.baseUrl + 'passdata', this.user)
      .subscribe(result => {
        this.router.navigate(['users-list', this.admin]);
      }, error => console.log(error));
  }
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status: string
  ) { }
}
