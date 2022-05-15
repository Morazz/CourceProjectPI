import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AddTemplateComponent } from '../add-template/add-template.component';
import { dialogConfig } from '../../../../globals';
import { EditTemplateComponent } from '../edit-template/edit-template.component';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css']
})

export class TemplatesListComponent {

  public templates: CouponTemplate[];
  public login: string;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog) {
    this.getTemplates();
    this.login = activateRoute.snapshot.params['login'];
  }

  getTemplates() {
    this.http.get<CouponTemplate[]>(this.baseUrl + 'coupontemplate').subscribe(result => {
      this.templates = result;
    }, error => console.error(error));
  }

  deleteTemplate(template_id: number) {
    if (confirm("Подтвердите удаление: " + template_id)) {
      this.http.delete(this.baseUrl + 'coupontemplate', { params: new HttpParams().set('template_id', template_id.toString()) })
        .subscribe(
          (data: any) => {
            this.getTemplates();
          },
          error => console.log(error));
    }
  }

  openDialog(parameter: string, template?: CouponTemplate) {
    switch (parameter) {
      case 'AddTemplate': {
        const dialogRef = this.dialog.open(AddTemplateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getTemplates();
        });
      }
      break;
      case 'EditTemplate': {
        dialogConfig.data = template;
        const dialogRef = this.dialog.open(EditTemplateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          this.getTemplates();
        });
      }
      break;
    }
  }
}

export class CouponTemplate {
  constructor(
    public template_id: number,
    public time: Date) { }
}
