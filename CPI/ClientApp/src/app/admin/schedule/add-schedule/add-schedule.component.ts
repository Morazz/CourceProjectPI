import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})

export class AddScheduleComponent {
  public admin: string;
  public start: string;
  public end: string;
  public schedule: Schedule = new Schedule(0, new Date(), new Date());

  constructor(private activateRoute: ActivatedRoute, private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialogRef: MatDialogRef<AddScheduleComponent>) {
    this.admin = activateRoute.snapshot.params['admin'];
  }

  postSchedule() {
    const hours = this.start.substr(0, 2);
    const minutes = this.start.substr(3, 2);
    const date = new Date(Date.UTC(0, 0, 0, Number(hours), Number(minutes)));
    this.schedule.appointment_start = date;
    
    const hours2 = this.end.substr(0, 2);
    const minutes2 = this.end.substr(3, 2);
    const date2 = new Date(Date.UTC(0, 0, 0, Number(hours2), Number(minutes2)));
    this.schedule.appointment_end = date2;

    console.log(this.schedule.appointment_start + " " + this.schedule.appointment_end);
    this.http.post(this.baseUrl + 'schedule', this.schedule)
      .subscribe(
        result => {
          this.close();
        }, error => console.log(error));
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
