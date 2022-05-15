import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { dialogConfig } from '../../../../globals';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})


export class UsersListComponent {
  public users: PassData[];
  public login: string;
  public open_filter = false;
  filter = { login: "", status: "" };
  ascLogin = false;
  ascStatus = false;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog  ) {
    this.login = activateRoute.snapshot.params['login'];
    http.get<PassData[]>(baseUrl + 'passdata').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  deleteUser(login: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null)
        this.http.delete(this.baseUrl + 'passdata', { params: new HttpParams().set('login', login) })
          .subscribe(
            (data: any) => {
              this.getUsers();
            },
            error => console.log(error));
    });

  }

  sortLogin() {
    if (this.ascLogin) {
      this.users.sort((usr1, usr2) => usr1.login.localeCompare(usr2.login));
      this.ascLogin = !this.ascLogin;
    }
    else {
      this.users.sort((usr1, usr2) => usr1.login.localeCompare(usr2.login)).reverse();
      this.ascLogin = !this.ascLogin;
    }
  }

  sortStatus() {
    if (this.ascStatus) {
      this.users.sort((usr1, usr2) => usr1.status.localeCompare(usr2.status));
      this.ascStatus = !this.ascStatus;
    }
    else {
      this.users.sort((usr1, usr2) => usr1.status.localeCompare(usr2.status)).reverse();
      this.ascStatus = !this.ascStatus;
    }
  }

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

  openSearch() {
    this.open_filter = !this.open_filter;
  }

  nullFilter() {
    this.filter.login = "";
    this.filter.status = "";
    this.getUsers();
    this.open_filter = !this.open_filter;
  }

  findFilter() {
    this.users = this.users.filter(usr => usr.login.toLowerCase().includes(this.filter.login.toLowerCase())
      && usr.status.toLowerCase().includes(this.filter.status.toLowerCase()));
  }

  getUser(login: string): PassData {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + login).subscribe(result => {
      return result;
    }, error => console.error(error));
    return;
  }
  
  openDialog(parameter: string, user?: PassData) {
    switch (parameter) {
      case 'AddUser': {
          const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getUsers();
          });
          break;
        }
      case 'EditUser': {
        dialogConfig.data = user;
        const dialogRef = this.dialog.open(EditUserComponent, dialogConfig );
        dialogRef.afterClosed().subscribe(data => {
          this.getUsers();
        });
        break;
      }
    }
  }
}

interface PassData {
  login: string;
  password: string;
  status: string;
}
