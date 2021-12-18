import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PassData } from '../admin/autoreg/authorize/authorize.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public user: PassData = new PassData("", "", "");
  roles: string[] = ["Пациент", "Врач", "Администратор"];
  public login: string;
  visible: boolean;

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.visible = false;
    this.login = activateRoute.snapshot.params['login'];
  }

  redirect() {
    console.log(this.user.login);
    //switch (this.user.status) {
    //  case "Пациент": {
    //    this.router.navigate(['user-page', this.login]);
    //  }
    //    break;
    //  case "Врач": {
    //    this.router.navigate(['doctor-info', this.login]);
    //  }
    //    break;
    //  case "Администратор": {
    //    this.router.navigate(['admin-panel', this.login]);
    //  }
    //    break;
    //}
  }
}

