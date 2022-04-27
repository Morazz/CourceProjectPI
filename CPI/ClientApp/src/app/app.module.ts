import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UsersListComponent } from './admin/user/users-list/users-list.component';
import { DoctorsListComponent } from './admin/doctor/doctors-list/doctors-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRippleModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddDoctorComponent } from './admin/doctor/add-doctor/add-doctor.component';
import { DepartmentsListComponent } from './admin/department/departments-list/departments-list.component';
import { AddDepartmentComponent } from './admin/department/add-department/add-department.component';
import { UserPageComponent } from './patient/user-page/user-page.component';
import { DoctorInfoComponent } from './doctor/doctor-info/doctor-info.component';
import { RegisterComponent } from './admin/autoreg/register/register.component';
import { AuthorizeComponent } from './admin/autoreg/authorize/authorize.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { PatientsListComponent } from './admin/patient/patients-list/patients-list.component';
import { AddPatientComponent } from './admin/patient/add-patient/add-patient.component';
import { SpecialitiesListComponent } from './admin/speciality/specialities-list/specialities-list.component';
import { AddSpecialityComponent } from './admin/speciality/add-speciality/add-speciality.component';
import { EditSpecialityComponent } from './admin/speciality/edit-speciality/edit-speciality.component';
import { AddScheduleComponent } from './admin/schedule/add-schedule/add-schedule.component';
import { EditPatientComponent } from './admin/patient/edit-patient/edit-patient.component';
import { SchedulesListComponent } from './admin/schedule/schedules-list/schedules-list.component';
import { EditScheduleComponent } from './admin/schedule/edit-schedule/edit-schedule.component';
import { TemplatesListComponent } from './admin/coupon-template/templates-list/templates-list.component';
import { AddTemplateComponent } from './admin/coupon-template/add-template/add-template.component';
import { EditTemplateComponent } from './admin/coupon-template/edit-template/edit-template.component';
import { PickCouponComponent } from './patient/pick-coupon/pick-coupon.component';
import { PickDepartmentComponent } from './patient/pick-department/pick-department.component';
import { PickDoctorComponent } from './patient/pick-doctor/pick-doctor.component';
import { CouponsListComponent } from './admin/coupon/coupons-list/coupons-list.component';
import { DoctorCouponsListComponent } from './doctor/doctor-coupons-list/doctor-coupons-list.component';
import { EditDepartmentComponent } from './admin/department/edit-department/edit-department.component';
import { PatientInfoComponent } from './doctor/patient-info/patient-info.component';
import { EditDoctorComponent } from './admin/doctor/edit-doctor/edit-doctor.component';
import { EditPatientInfoComponent } from './patient/edit-patient-info/edit-patient-info.component';
import { MatDialogModule } from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    AuthorizeComponent,
    AdminPanelComponent,
    UserPageComponent,
    UsersListComponent,
    AddUserComponent,
    EditUserComponent,
    DoctorsListComponent,
    AddDoctorComponent,
    DoctorInfoComponent,
    PatientsListComponent,
    AddPatientComponent,
    DepartmentsListComponent,
    AddDepartmentComponent,
    SpecialitiesListComponent,
    AddSpecialityComponent,
    EditSpecialityComponent,
    SchedulesListComponent,
    AddScheduleComponent,
    EditScheduleComponent,
    EditPatientComponent,
    TemplatesListComponent,
    AddTemplateComponent,
    EditTemplateComponent,
    PickDepartmentComponent,
    PickDoctorComponent,
    PickCouponComponent,
    CouponsListComponent,
    DoctorCouponsListComponent,
    EditDepartmentComponent,
    PatientInfoComponent,
    EditDoctorComponent,
    EditPatientInfoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, },
      { path: 'authorize', component: AuthorizeComponent },
      { path: 'user-page/:login', component: UserPageComponent },
      { path: 'admin-panel/:admin', component: AdminPanelComponent },
      { path: 'users-list/:admin', component: UsersListComponent },
      { path: 'add-user/:admin', component: AddUserComponent },
      { path: 'edit-user/:admin/:login', component: EditUserComponent },
      { path: 'doctors-list/:admin', component: DoctorsListComponent },
      { path: 'add-doctor/:admin', component: AddDoctorComponent },
      { path: 'doctor-info/:login', component: DoctorInfoComponent },
      { path: 'patients-list/:admin', component: PatientsListComponent },
      { path: 'add-patient/:admin', component: AddPatientComponent },
      { path: 'departments-list/:admin', component: DepartmentsListComponent },
      { path: 'add-department/:admin', component: AddDepartmentComponent },
      { path: 'specialities-list/:admin', component: SpecialitiesListComponent },
      { path: 'add-speciality/:admin', component: AddSpecialityComponent },
      { path: 'edit-speciality/:admin/:speciality_code', component: EditSpecialityComponent },
      { path: 'schedules-list/:admin', component: SchedulesListComponent },
      { path: 'add-schedule/:admin', component: AddScheduleComponent },
      { path: 'edit-schedule/:admin/:schedule_code', component: EditScheduleComponent },
      { path: 'edit-patient/:admin/:login', component: EditPatientComponent },
      { path: 'templates-list/:admin', component: TemplatesListComponent },
      { path: 'add-template/:admin', component: AddTemplateComponent },
      { path: 'edit-template/:template_id/:admin', component: EditTemplateComponent },
      { path: 'pick-department/:login', component: PickDepartmentComponent },
      { path: 'pick-doctor/:login/:department_code', component: PickDoctorComponent },
      { path: 'pick-coupon/:login/:department_code/:doctor_login', component: PickCouponComponent },
      { path: 'coupons-list/:admin', component: CouponsListComponent },
      { path: 'doctor-coupons/:login', component: DoctorCouponsListComponent },
      { path: 'edit-department/:admin/:department_code', component: EditDepartmentComponent },
      { path: 'patient-info/:doctor/:patient', component: PatientInfoComponent },
      { path: 'edit-doctor/:admin/:login', component: EditDoctorComponent },
      { path: 'edit-patient-info/:login', component: EditPatientInfoComponent },
    ]),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    //MaterialDialog
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddTemplateComponent]
})
export class AppModule { }
