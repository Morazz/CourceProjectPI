import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
/** add-template component*/
export class AddTemplateComponent {
  template: CouponTemplate = new CouponTemplate(new Date());

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  postCoupon() {
    console.log(this.template.time);
    this.http.post(this.baseUrl + 'coupontemplate', this.template)
      .subscribe(
        result => {
          this.router.navigate(['/templates-list']);
        }, error => console.log(error));
  };
}

export class CouponTemplate {
  constructor(
    public time: Date) { }
}
