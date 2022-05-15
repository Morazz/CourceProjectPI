import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { dialogConfig } from '../../../../globals';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';

@Component({
    selector: 'app-schedules-list',
    templateUrl: './schedules-list.component.html',
    styleUrls: ['./schedules-list.component.css']
})

export class SchedulesListComponent {
  login: string;
  public schedules: Schedule[];
  public dialogConfig;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog  ) {
    this.getSchedules();
    this.login = activateRoute.snapshot.params['login'];
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.minWidth = '25%';
  }

  getSchedules() {
    this.http.get<Schedule[]>(this.baseUrl + 'schedule').subscribe(result => {
      this.schedules = result;
    }, error => console.error(error));
  }

  deleteSchedule(schedule_code: number) {
    if (confirm("Подтвердите удаление: " + schedule_code)) {
      this.http.delete(this.baseUrl + 'schedule', { params: new HttpParams().set('schedule_code', schedule_code.toString()) })
        .subscribe(
          (data: any) => {
            this.getSchedules();
          },
          error => console.log(error));
    }
  }

  openDialog(parameter: string, schedule?: Schedule) {
    switch (parameter) {
      case 'AddSchedule': {
        const dialogRef = this.dialog.open(AddScheduleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getSchedules();
        });
        break;
      }
      case 'EditSchedule': {
        dialogConfig.data = schedule;
        const dialogRef = this.dialog.open(EditScheduleComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getSchedules();
        });
        break;
      }
    }
  }
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}
