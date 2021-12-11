import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-schedule',
    templateUrl: './edit-schedule.component.html',
    styleUrls: ['./edit-schedule.component.css']
})

export class EditScheduleComponent {
  public schedule: Sch = new Sch(0, null, null);
  public scheduler: Schedule = new Schedule(0, new Date(), new Date());
  public schedule_code: number;
  public date: Date = new Date();

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)  {
    this.schedule_code = activateRoute.snapshot.params['schedule_code'];
    this.getSchedule(this.schedule_code);
  }

  getSchedule(schedule_code: number) {
    this.http.get<Schedule>(this.baseUrl + 'schedule/' + schedule_code).subscribe(result => {
      this.scheduler = result;
      console.log(this.scheduler.schedule_code);
    }, error => console.error(error));
  }

  editSchedule() {
    this.scheduler.appointment_start = new Date(new Date().toISOString().slice(0, 10) + " " + this.schedule.appointment_start);
    this.scheduler.appointment_end = new Date(new Date().toISOString().slice(0, 10) + " " + this.schedule.appointment_end);
    this.http.put(this.baseUrl + 'schedule', this.scheduler).subscribe(result => {
      this.router.navigate(['schedules-list']);
    }, error => console.error(error));
  }
}

export class Sch {
  constructor(
    public schedule_code: number,
    public appointment_start: Time,
    public appointment_end: Time) { }
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}
