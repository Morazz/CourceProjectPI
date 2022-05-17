import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UsersListComponent } from './admin/user/users-list/users-list.component';
import { DoctorsListComponent } from './admin/doctor/doctors-list/doctors-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogRef, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRippleModule, MAT_DIALOG_DATA } from '@angular/material';
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
import { MatIconModule } from '@angular/material/icon';
import { AddHospitalComponent } from './admin/hospital/add-hospital/add-hospital.component';
import { HospitalsListComponent } from './admin/hospital/hospitals-list/hospitals-list.component';
import { MatTooltipModule } from '@angular/material';
import { AddModeratorComponent } from './admin/moderator/add-moderator/add-moderator.component';
import { ModeratorsListComponent } from './admin/moderator/moderators-list/moderators-list.component';
import { EditHospitalComponent } from './admin/hospital/edit-hospital/edit-hospital.component';
import { DeleteDialogComponent } from './admin/delete-dialog/delete-dialog.component';
import { HospitalInfoComponent } from './hospital/hospital-info/hospital-info.component';
import { HospitalSchedulesComponent } from './hospital/hospital-schedules/hospital-schedules.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioGroup } from '@angular/material/typings/radio';
import { MatRadioModule } from '@angular/material/radio';

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
    AddHospitalComponent,
    HospitalsListComponent,
    EditHospitalComponent,
    ModeratorsListComponent,
    AddModeratorComponent,
    DeleteDialogComponent,
    HospitalInfoComponent,
    HospitalSchedulesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
    MatRadioModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, },
      { path: 'authorize', component: AuthorizeComponent },
      { path: 'user-page/:login', component: UserPageComponent },
      { path: 'admin-panel/:login', component: AdminPanelComponent },
      //Users
      { path: 'users-list/:login', component: UsersListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:login', component: EditUserComponent },
      //Doctors
      { path: 'doctors-list/:login', component: DoctorsListComponent },
      { path: 'add-doctor/:login', component: AddDoctorComponent },
      { path: 'edit-doctor/:login/:doctor', component: EditDoctorComponent },
      { path: 'doctor-info/:login', component: DoctorInfoComponent },
      //Patients
      { path: 'patients-list/:login', component: PatientsListComponent },
      { path: 'add-patient/:login', component: AddPatientComponent },
      { path: 'edit-patient/:login/:patient', component: EditPatientComponent },
      //Departments
      { path: 'departments-list/:login', component: DepartmentsListComponent },
      { path: 'add-department', component: AddDepartmentComponent },
      { path: 'edit-department/:department_code', component: EditDepartmentComponent },
      //Specialitites
      { path: 'specialities-list/:login', component: SpecialitiesListComponent },
      { path: 'add-speciality/:login', component: AddSpecialityComponent },
      { path: 'edit-speciality/:speciality_code', component: EditSpecialityComponent },
      //Schedules
      { path: 'schedules-list/:login', component: SchedulesListComponent },
      { path: 'add-schedule/:login', component: AddScheduleComponent },
      { path: 'edit-schedule/:schedule_code', component: EditScheduleComponent },
      //Templates
      { path: 'templates-list/:login', component: TemplatesListComponent },
      { path: 'add-template', component: AddTemplateComponent },
      { path: 'edit-template/:template_id', component: EditTemplateComponent },
      //Coupon picking
      { path: 'pick-department/:login', component: PickDepartmentComponent },
      { path: 'pick-doctor/:login/:hospital_id', component: PickDoctorComponent },
      { path: 'pick-coupon/:login/:department_code/:doctor_login', component: PickCouponComponent },
      //Coupons
      { path: 'coupons-list/:login', component: CouponsListComponent },
      { path: 'doctor-coupons/:login', component: DoctorCouponsListComponent },
      //Patient info
      { path: 'patient-info/:doctor/:patient', component: PatientInfoComponent },
      { path: 'edit-patient-info/:login', component: EditPatientInfoComponent },
      { path: 'add-patient-info/:login', component: EditPatientInfoComponent },
      //Hospitals
      { path: 'hospitals-list/:login', component: HospitalsListComponent },
      { path: 'add-hospital', component: AddHospitalComponent },
      { path: 'edit-hospital', component: EditHospitalComponent },
      { path: 'hospital-info/:hospital_id', component: HospitalInfoComponent },
      { path: 'hospital-schedules/:hospital_id', component: HospitalSchedulesComponent },
      //Moderators
/*      { path: 'moderator-panel/:login', component: ModeratorPanelComponent },*/
      { path: 'moderators-list/:login', component: ModeratorsListComponent },
      { path: 'add-moderator', component: AddModeratorComponent },
      ///
      { path: 'delete-dialog', component: DeleteDialogComponent },
    ]),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    //MaterialDialog
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddTemplateComponent]
})
export class AppModule { }
