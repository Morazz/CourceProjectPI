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
  public scheduler: Schedule = new Schedule(0, new Date(), new Date());
  public schedule_code: number;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)  {
    this.schedule_code = activateRoute.snapshot.params['schedule_code'];
    this.getSchedule(this.schedule_code);
  }

  getSchedule(schedule_code: number) {
    this.http.get<Schedule>(this.baseUrl + 'schedule/' + schedule_code).subscribe(result => {
      console.log(result.schedule_code);
      this.scheduler = result;
      
    }, error => console.error(error));
  }

  editSchedule() {
    console.log(this.scheduler.schedule_code);
    console.log(this.scheduler.appointment_start);
    console.log(this.scheduler.appointment_end);
    this.http.put(this.baseUrl + 'schedule', this.scheduler).subscribe(result => {
      this.router.navigate(['schedules-list']);
    }, error => console.error(error));
  }
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}
