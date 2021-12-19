import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})


export class UsersListComponent {
  public users: PassData[];
  public admin: string;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string) {
    this.admin = activateRoute.snapshot.params['admin'];
    http.get<PassData[]>(baseUrl + 'passdata').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  deleteUser(login: string) {
    if (confirm("Подтвердите удаление: " + login)) {
      this.http.delete(this.baseUrl + 'passdata', { params: new HttpParams().set('login', login) })
        .subscribe(
          (data: any) => {
            this.getUsers();
          },
          error => console.log(error));
    }
  }

  //sortLogin() {
  //  this.users.sort(us => us.login).reverse();
  //}

  //sortStatus() {
  //  this.users.sort(us => us.status).reverse();
  //}

  getUsers() {
    this.http.get<PassData[]>(this.baseUrl + 'passdata').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.http.get<PassData[]>(this.baseUrl + 'passdata/ByLog/' + text).subscribe(result => {
        this.users = result;
      }, error => console.error(error));
    }
    else this.getUsers();
  }
}

interface PassData {
  login: string;
  password: string;
  status: string;
}
