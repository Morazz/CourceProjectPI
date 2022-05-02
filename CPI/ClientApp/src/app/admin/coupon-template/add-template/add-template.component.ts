import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})

export class AddTemplateComponent {
  template: string = "";
  public admin: string = "";

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialogRef: MatDialogRef<AddTemplateComponent>,  ) {
    this.admin = activateRoute.snapshot.params['admin'];
  }

  postCoupon() {
    const hours = this.template.substr(0, 2);
    const minutes = this.template.substr(3, 2);
    const date = new Date(Date.UTC(0, 0, 0, Number(hours), Number(minutes)));
      this.http.post(this.baseUrl + 'coupontemplate', new CouponTemplate(date))
        .subscribe(
          result => {
            this.router.navigate(['/templates-list', this.admin]);
          }, error => console.log(error));
  }


  close() {
    this.dialogRef.close();
  }

}

export class CouponTemplate {
  constructor(
    public time: Date) { }
}
