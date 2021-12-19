import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-schedules-list',
    templateUrl: './schedules-list.component.html',
    styleUrls: ['./schedules-list.component.css']
})

export class SchedulesListComponent {
  admin: string;
  public schedules: Schedule[];

  constructor(private activateRoute: ActivatedRoute, private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getSchedules();
    this.admin = activateRoute.snapshot.params['admin'];
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
}

export class Schedule {
  constructor(
    public schedule_code: number,
    public appointment_start: Date,
    public appointment_end: Date) { }
}
