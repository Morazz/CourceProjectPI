import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})

export class AddScheduleComponent {
  public schedule: Sch = new Sch(0, null, null);
  public scheduler: Schedule = new Schedule(this.schedule.schedule_code, new Date(), new Date());
  public 
  public date: Date = new Date();
  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }



  postSchedule() {
    this.scheduler.appointment_start = new Date(new Date().toISOString().slice(0, 10) + " " + this.schedule.appointment_start);
    this.scheduler.appointment_end = new Date(new Date().toISOString().slice(0, 10) + " " + this.schedule.appointment_end);

    this.http.post(this.baseUrl + 'schedule', this.scheduler)
      .subscribe(
        result => {
          this.router.navigate(['/schedules-list']);
        }, error => console.log(error));
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
