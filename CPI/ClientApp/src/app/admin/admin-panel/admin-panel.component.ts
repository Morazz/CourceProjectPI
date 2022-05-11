import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { dialogConfig, roles } from '../../../globals';
import { AddTemplateComponent } from '../coupon-template/add-template/add-template.component';
import { AddDepartmentComponent } from '../department/add-department/add-department.component';
import { AddHospitalComponent } from '../hospital/add-hospital/add-hospital.component';
import { AddModeratorComponent } from '../moderator/add-moderator/add-moderator.component';
import { AddScheduleComponent } from '../schedule/add-schedule/add-schedule.component';
import { AddSpecialityComponent } from '../speciality/add-speciality/add-speciality.component';
import { AddUserComponent, PassData } from '../user/add-user/add-user.component';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
/** admin-panel component*/
export class AdminPanelComponent {

  public login: string = "";
  public isAdmin: boolean = true;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog  ) {

    this.login = activateRoute.snapshot.params['login'];
    this.checkStatus();
  }

  openDialog(parameter: string) {
    switch (parameter) {
      case 'AddUser': this.dialog.open(AddUserComponent, dialogConfig); break;
      case 'AddSchedule': this.dialog.open(AddScheduleComponent, dialogConfig); break;
      case 'AddDepartment': this.dialog.open(AddDepartmentComponent, dialogConfig); break;
      case 'AddTemplate': this.dialog.open(AddTemplateComponent, dialogConfig); break;
      case 'AddSpeciality': this.dialog.open(AddSpecialityComponent, dialogConfig); break;
      case 'AddModer': this.dialog.open(AddModeratorComponent, dialogConfig); break;
      case 'AddHosp': this.dialog.open(AddHospitalComponent, dialogConfig); break;
    }
  }

  checkStatus() {
    this.http.get<PassData>(this.baseUrl + 'passdata/' + this.login).subscribe(result => {
      result.status == roles[2] ? this.isAdmin : this.isAdmin = !this.isAdmin;
      console.log(result.status);
      console.log(this.isAdmin);
    }, error => console.error(error));
  }
}
