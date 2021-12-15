import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-templates-list',
    templateUrl: './templates-list.component.html',
    styleUrls: ['./templates-list.component.css']
})

export class TemplatesListComponent {

  public templates: CouponTemplate[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getTemplates();
  }

  getTemplates() {
    this.http.get<CouponTemplate[]>(this.baseUrl + 'coupontemplate').subscribe(result => {
      this.templates = result;
    }, error => console.error(error));
  }

  deleteTemplate(template_id: number) {
    this.http.delete(this.baseUrl + 'coupontemplate', { params: new HttpParams().set('template_id', template_id.toString()) })
      .subscribe(
        (data: any) => {
          this.getTemplates();
        },
        error => console.log(error));
  }
}

export class CouponTemplate {
  constructor(
    public template_id: number,
    public time: Date) { }
}
