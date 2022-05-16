import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../../admin/schedule/add-schedule/add-schedule.component';
import { Speciality } from '../../admin/speciality/add-speciality/add-speciality.component';

@Component({
  selector: 'app-hospital-schedules',
  templateUrl: './hospital-schedules.component.html',
  styleUrls: ['./hospital-schedules.component.css']
})
/** hospital-schedules component*/
export class HospitalSchedulesComponent {

  public doctors: Doctor[];
  public schedule: Schedule[];
  public departments: Department[];
  public hospital_id: string;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string) {
    this.hospital_id = activateRoute.snapshot.params['hospital_id'];

    this.getDepartments(this.hospital_id);
  }

  getDoctors() {

    this.http.get<Doctor[]>(this.baseUrl + 'doctor/hosp/' + this.hospital_id).subscribe(result => {

      this.doctors = result;

      this.doctors.forEach(doc => {
        this.http.get<Department>(this.baseUrl + 'department/' + doc.department_code).subscribe(result => {
          doc.department = result;
        }, error => console.error(error));

        this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
          doc.speciality = result;
        }, error => console.error(error));

        this.http.get<Schedule>(this.baseUrl + 'schedule/' + doc.schedule_code).subscribe(result => {
          doc.hours = result;
        }, error => console.error(error));

      });

      this.departments.forEach(dep => {
        dep.doctors = this.doctors.filter(doc => doc.department_code == dep.department_code);
      });

      this.departments = this.departments.filter(dep => dep.doctors.length > 0);
    }, error => console.error(error));
  }

  getDepartments(hospital_id: string) {
    this.http.get<Department[]>(this.baseUrl + 'department/hosp/' + hospital_id).subscribe(result => {
      this.departments = result;
      this.getDoctors();
      this.departments.forEach(dep => {
        console.log(this.doctors);
      });
    }, error => console.error(error));
  }

}

export class Department {
  constructor(
    public department_code: number,
    public department_name: string,
    public head: string,
    public headName: Doctor,
    public doctors: Doctor[]) { }
}

export class Doctor {
  constructor(
    public login: string,
    public firstname: string,
    public fathername: string,
    public surname: string,
    public cabinet: number,
    public department_code: number,
    public schedule_code: number,
    public speciality_code: string,
    public speciality: Speciality,
    public department: Department,
    public hours: Schedule
  ) { }
}
