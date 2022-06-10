import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { roles } from '../../../../globals';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
/** authorize component*/
export class AuthorizeComponent {

  public user: PassData = new PassData("", "", "");
  /*roles: string[] = ["Пациент", "Врач", "Администратор", "Модератор"];*/
  public login: string;
  public password: string;
  errors: string[] = [];
 
  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  authorize() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.user.login).subscribe(result => {
      this.errors = [];
      if (result != null) {
        this.user = result;
        if (this.user.password != this.password)
          this.errors.push("Неверный пароль");
        else
          this.redirect();
          //this.router.navigate(['/'], { queryParams: { login: this.user.login} });
      }
      else this.errors.push("Пользователь с таким именем не существует");
    }, error => console.error(error));
  }

  redirect() {
    switch (this.user.status) {
      case roles[0]: {
        this.router.navigate(['/'], { queryParams: { login: this.user.login } });
      }
        break;
      case roles[1]: {
        this.router.navigate(['doctor-info'], { queryParams: { login: this.user.login } });
      }
        break;
      case roles[2]: {
        this.router.navigate(['admin-panel'], { queryParams: { login: this.user.login }});
      }
        break;
      case roles[3]: {
        this.router.navigate(['admin-panel'], { queryParams: { login: this.user.login } });
      }
        break;
    }
  }
}

export class PassData {
  constructor(
    public login: string,
    public password: string,
    public status: string
  ) { }
}

