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
import { UsersListComponent } from './admin/users-list/users-list.component';
import { RegisterComponent } from './admin/register/register.component';
import { AuthorizeComponent } from './admin/authorize/authorize.component';
import { DoctorsListComponent } from './admin/doctors-list/doctors-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditPatientComponent } from './admin/edit-patient/edit-patient.component';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { DepartmentsListComponent } from './admin/departments-list/departments-list.component';
import { AddDepartmentComponent } from './admin/add-department/add-department.component';
import { AddScheduleComponent } from './admin/add-schedule/add-schedule.component';
import { PatientsListComponent } from './admin/patients-list/patients-list.component';

import { UserPageComponent } from './patient/user-page/user-page.component';
import { DoctorInfoComponent } from './doctor/doctor-info/doctor-info.component';
import { AddPatientComponent } from './admin/add-patient/add-patient.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { SpecialitiesListComponent } from './admin/specialities-list/specialities-list.component';
import { AddSpecialityComponent } from './admin/add-speciality/add-speciality.component';
import { EditSpecialityComponent } from './admin/edit-speciality/edit-speciality.component';

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

    AddScheduleComponent,
    EditPatientComponent
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

      /*{ path: 'schedules-list', component: Schedu },*/
      { path: 'add-schedule', component: AddScheduleComponent },
      { path: 'edit-patient/:login', component: EditPatientComponent },
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
