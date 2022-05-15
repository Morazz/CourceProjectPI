import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  public admin: string = "";

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<EditTemplateComponent>) {

    this.getTemplate(data);
    this.admin = activateRoute.snapshot.params['admin'];
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
          this.close();
        }, error => console.log(error));
  }

  getTemplate(id: number) {
    this.http.get<CouponTemplate>(this.baseUrl + 'coupontemplate/' + id)
      .subscribe(
        result => {
          this.temp = result;
        }, error => console.log(error));
  }

  close() {
    this.dialogRef.close();
  }
}

export class CouponTemplate {
  constructor(
    public template_id: number,
    public time: Date) { }
}
