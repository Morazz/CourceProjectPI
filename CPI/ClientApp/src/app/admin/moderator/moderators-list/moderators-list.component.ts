import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AddModeratorComponent, Moderator } from '../add-moderator/add-moderator.component';
import { dialogConfig } from '../../../../globals';

@Component({
  selector: 'app-moderators-list',
  templateUrl: './moderators-list.component.html',
  styleUrls: ['./moderators-list.component.css']
})
/** moderators-list component*/
export class ModeratorsListComponent {

  public moderators: Moderator[];
  public login: string;

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog) {
    this.getModerators();
    this.login = activateRoute.snapshot.params['login'];
  }

  getModerators() {
    this.http.get<Moderator[]>(this.baseUrl + 'moderator').subscribe(result => {
      this.moderators = result;
    }, error => console.error(error));
  }

  openDialog() {
    this.dialog.open(AddModeratorComponent, dialogConfig);
  }

  deleteModerator(login: string) {
    if (confirm("Подтвердите удаление: " + login)) {

      this.http.delete(this.baseUrl + 'moderator', { params: new HttpParams().set('id', login.toString()) })
        .subscribe(
          (data: any) => {
            this.http.delete(this.baseUrl + 'passdata', { params: new HttpParams().set('id', login.toString()) })
              .subscribe(
                (data: any) => {
                  this.getModerators();
                },
                error => console.log(error));
          },
          error => console.log(error));
    }
  }
}
