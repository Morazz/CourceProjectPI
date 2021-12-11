import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent {
  public user: PassData;
  roles: string[] = ["Пациент", "Врач", "Администратор"];
  login: string | undefined;
  password: string;
  status: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.login = activateRoute.snapshot.params['login'];
    this.getUser(this.login);
  }

  getUser(login: string) {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + login).subscribe(result => {
      this.user = result;
    }, error => console.error(error));
  }

  postData(user: PassData) {
    this.http.put(this.baseUrl + 'passdata', user)
      .subscribe(result => {
        this.router.navigate(['users-list']);
      }, error => console.log(error));
  }
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status
  ) { }
}
