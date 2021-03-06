import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-schedule',
    templateUrl: './edit-schedule.component.html',
    styleUrls: ['./edit-schedule.component.css']
})

export class EditScheduleComponent {
  public admin: string;
  public schedule: Schedule = new Schedule(0, new Date(), new Date());
  public schedule_code: number;
  public start: string;
  public end: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<EditScheduleComponent>  ) {
    //this.schedule_code = data;
    //this.admin = activateRoute.snapshot.params['admin'];
    this.getSchedule(data);
  }

  getSchedule(schedule_code: number) {
    this.http.get<Schedule>(this.baseUrl + 'schedule/' + schedule_code).subscribe(result => {
      this.schedule = result;
      
    }, error => console.error(error));
  }

  postData() {
    const hours = this.start.substr(0, 2);
    const minutes = this.start.substr(3, 2);
    const date = new Date(Date.UTC(0, 0, 0, Number(hours), Number(minutes)));
    this.schedule.appointment_start = date;

    const hours2 = this.end.substr(0, 2);
    const minutes2 = this.end.substr(3, 2);
    const date2 = new Date(Date.UTC(0, 0, 0, Number(hours2), Number(minutes2)));
    this.schedule.appointment_end = date2;

    this.http.put(this.baseUrl + 'schedule', this.schedule).subscribe(result => {
      this.close();
    }, error => console.error(error));
  }

  close() {
    this.dialogRef.close();
  }
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}
