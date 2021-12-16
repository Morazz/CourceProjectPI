import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-template',
    templateUrl: './edit-template.component.html',
    styleUrls: ['./edit-template.component.css']
})
/** edit-template component*/
export class EditTemplateComponent {
  template: string = "";
  t_id: number;
  temp: CouponTemplate = new CouponTemplate(0, new Date());

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.t_id = activateRoute.snapshot.params['template_id'];
    this.getTemplate()
  }

  postCoupon() {
    const hours = this.template.substr(0, 2);
    const minutes = this.template.substr(3, 2);
    const date = new Date(Date.UTC(0, 0, 0, Number(hours), Number(minutes)));
    this.temp.time = date;
    console.log(this.temp);

    this.http.put(this.baseUrl + 'coupontemplate', this.temp)
      .subscribe(
        result => {
          this.router.navigate(['/templates-list']);
        }, error => console.log(error));
  }

  getTemplate() {
    this.http.get<CouponTemplate>(this.baseUrl + 'coupontemplate/' + this.t_id)
      .subscribe(
        result => {
          this.temp = result;
        }, error => console.log(error));
  }
}

export class CouponTemplate {
  constructor(
    public template_id: number,
    public time: Date) { }
}
