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
  public schedule: Schedule = new Schedule(0, new Date(), new Date());
  public schedule_code: number;
  public start: string;
  public end: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)  {
    this.schedule_code = activateRoute.snapshot.params['schedule_code'];
    this.getSchedule(this.schedule_code);
  }

  getSchedule(schedule_code: number) {
    this.http.get<Schedule>(this.baseUrl + 'schedule/' + schedule_code).subscribe(result => {
      console.log(result.schedule_code);
      this.schedule = result;
      
    }, error => console.error(error));
  }

  editSchedule() {
    const hours = this.start.substr(0, 2);
    const minutes = this.start.substr(3, 2);
    const date = new Date(Date.UTC(0, 0, 0, Number(hours), Number(minutes)));
    this.schedule.appointment_start = date;

    const hours2 = this.end.substr(0, 2);
    const minutes2 = this.end.substr(3, 2);
    const date2 = new Date(Date.UTC(0, 0, 0, Number(hours2), Number(minutes2)));
    this.schedule.appointment_end = date2;

    this.http.put(this.baseUrl + 'schedule', this.schedule).subscribe(result => {
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
