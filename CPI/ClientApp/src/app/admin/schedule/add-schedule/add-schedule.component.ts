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
  public schedule: Schedule = new Schedule(0, new Date(), new Date());
  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  postSchedule() {
    console.log(this.schedule.appointment_start + " " + this.schedule.appointment_end);
    this.http.post(this.baseUrl + 'schedule', this.schedule)
      .subscribe(
        result => {
          this.router.navigate(['/schedules-list']);
        }, error => console.log(error));
  }
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}
