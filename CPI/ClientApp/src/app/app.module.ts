import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UsersListComponent } from './admin/user/users-list/users-list.component';
import { DoctorsListComponent } from './admin/doctor/doctors-list/doctors-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatNativeDateModule } from '@angular/material';
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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
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
    EditTemplateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'authorize', component: AuthorizeComponent },
      { path: 'user-page/:login', component: UserPageComponent },
      { path: 'admin-panel', component: AdminPanelComponent },
      { path: 'users-list', component: UsersListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:login', component: EditUserComponent },
      { path: 'doctors-list', component: DoctorsListComponent },
      { path: 'add-doctor', component: AddDoctorComponent },
      { path: 'doctor-page/:login', component: DoctorInfoComponent },
      { path: 'patients-list', component: PatientsListComponent },
      { path: 'add-patient', component: AddPatientComponent },
      { path: 'departments-list', component: DepartmentsListComponent },
      { path: 'add-department', component: AddDepartmentComponent },
      { path: 'specialities-list', component: SpecialitiesListComponent },
      { path: 'add-speciality', component: AddSpecialityComponent },
      { path: 'edit-speciality/:speciality_code', component: EditSpecialityComponent },
      { path: 'schedules-list', component: SchedulesListComponent },
      { path: 'add-schedule', component: AddScheduleComponent },
      { path: 'edit-schedule/:schedule_code', component: EditScheduleComponent },
      { path: 'edit-patient/:login', component: EditPatientComponent },
      { path: 'templates-list', component: TemplatesListComponent },
      { path: 'add-template', component: AddTemplateComponent },
      { path: 'edit-template/:template_id', component: EditTemplateComponent },
    ]),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
