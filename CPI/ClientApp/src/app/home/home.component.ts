import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, PassData, Patient } from '../admin/autoreg/authorize/authorize.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public user: PassData = new PassData("", "", "");
  roles: string[] = ["Пациент", "Врач", "Администратор"];
  public login: string;
  public password: string;
  errors: string[] = [];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  authorize() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.user.login).subscribe(result => {
      this.errors = [];
      if (result != null) {
        this.user = result;
        if (this.user.password != this.password)
          this.errors.push("Неверный пароль");
        else
          this.redirect();
      }
      else this.errors.push("Пользователь с таким именем не существует");
    }, error => console.error(error));
  }

  redirect() {
    console.log(this.user.status);
    switch (this.user.status) {
      case "Пациент": {
        this.router.navigate(['user-page', this.user.login]);
      }
        break;
      case "Врач": {
        
        this.router.navigate(['doctor-info', this.user.login]);
      }
        break;
      case "Администратор": {
        this.router.navigate(['admin-panel', this.user.login]);
      }
        break;
    }
  }
}
