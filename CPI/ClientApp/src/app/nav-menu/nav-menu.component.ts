import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { PassData } from '../admin/autoreg/authorize/authorize.component';
import { roles } from '../../globals';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { OnInit } from '@angular/core';
import { getuid } from 'process';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  public user: PassData = new PassData(null, null, null);
  roles: string[] = roles;
  public login: string = null;
  visible: boolean;
  public isAutho: boolean = false;

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //this.login = this.activateRoute.snapshot.params['login'];
        this.login = activateRoute.snapshot.queryParamMap.get('login');
        this.getUser();
        //this.login == null || this.login == undefined ? this.isAutho : !this.isAutho;
        console.log("Autho: " + this.isAutho);
        console.log("Login: " + this.login);
        //console.log(this.login);
        //console.log(router.url); 
      }
    })
  }

  getUser() {
    console.log(this.login);
    if (this.login != null || this.login != undefined)
      this.http.get<PassData>(this.baseUrl + 'passdata/' + this.login).subscribe(result => {
        this.user = result;
        this.isAutho = true;
        console.log(this.user);
      }, error => console.error(error));
    else
      this.isAutho = false;
  }

  redirect() {
    console.log(this.user.status);
    switch (this.user.status) {
      case "Пациент": {
        this.router.navigate(['user-page'], { queryParams: { login: this.user.login } });
      }
        break;
      case "Врач": {
        this.router.navigate(['doctor-info'], { queryParams: { login: this.user.login } });
      }
        break;
      case "Администратор": {
        this.router.navigate(['admin-panel'], { queryParams: { login: this.user.login } });
      }
        break;
    }
  }
}

