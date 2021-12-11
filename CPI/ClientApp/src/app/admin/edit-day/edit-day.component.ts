import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-day',
  templateUrl: './edit-day.component.html',
  styleUrls: ['./edit-day.component.css']
})

export class EditDayComponent {
  public day: Day;
  day_code: number | undefined;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.day_code = activateRoute.snapshot.params['day_code'];
    this.getDay(this.day_code);
  }

  getDay(day_code: number) {
    this.http.get<Day>(this.baseUrl + 'day/' + day_code).subscribe(result => {
      this.day = result;
    }, error => console.error(error));
  }

  postDay(day: Day) {
    this.http.put(this.baseUrl + 'day', day)
      .subscribe(
        (data: any) => {
          this.router.navigate(['days-list']);
        }, error => console.log(error));
  };
}

export class Day {
  constructor(public day_code: number, public day: string) { }
}

