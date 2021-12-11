import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-days-list',
    templateUrl: './days-list.component.html',
    styleUrls: ['./days-list.component.css']
})

export class DaysListComponent {
  public days: Day[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDays();
  }

  deleteDay(day_code: number) {
    this.http.delete(this.baseUrl + 'day', { params: new HttpParams().set('day_code', day_code.toString()) })
      .subscribe(
        (data: any) => {
          this.getDays();
        },
        error => console.log(error));
  }

  getDays() {
    this.http.get<Day[]>(this.baseUrl + 'day').subscribe(result => {
      this.days = result;
    }, error => console.error(error));
  }
}

export class Day {
  constructor(public day_code: number, public day: string) { }
}
