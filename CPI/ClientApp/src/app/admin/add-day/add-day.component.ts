import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.css']
})

export class AddDayComponent {
  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public day: Day;

  postDay(day: Day) {
    this.http.post(this.baseUrl + 'day', day)
      .subscribe(
        result => {
          this.router.navigate(['days-list']);
        }, error => console.log(error));
  };

  change(text: string) {
    console.log(text);
  }
}

export class Day {
  constructor(
    public day_code: number,
    public day: string) { }
}
