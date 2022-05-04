import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AddTemplateComponent } from '../coupon-template/add-template/add-template.component';
import { AddDepartmentComponent } from '../department/add-department/add-department.component';
import { AddScheduleComponent } from '../schedule/add-schedule/add-schedule.component';
import { AddSpecialityComponent } from '../speciality/add-speciality/add-speciality.component';
import { AddUserComponent } from '../user/add-user/add-user.component';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
/** admin-panel component*/
export class AdminPanelComponent {

  public admin: string = "";
  public dialogConfig;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog  ) {

    this.admin = activateRoute.snapshot.params['admin'];
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.minWidth = '25%';
  }

  openDialog(parameter: string) {
    console.log(parameter);
    switch (parameter) {
      case 'AddUser': this.dialog.open(AddUserComponent, this.dialogConfig); break;
      case 'AddSchedule': this.dialog.open(AddScheduleComponent, this.dialogConfig); break;
      case 'AddDepartment': this.dialog.open(AddDepartmentComponent, this.dialogConfig); break;
      case 'AddTemplate': this.dialog.open(AddTemplateComponent, this.dialogConfig); break;
      case 'AddSpeciality': this.dialog.open(AddSpecialityComponent, this.dialogConfig); break;
    }
  }

}
