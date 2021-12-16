import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Doctor, Speciality, Schedule } from '../../admin/doctor/doctors-list/doctors-list.component';

@Component({
  selector: 'app-pick-doctor',
  templateUrl: './pick-doctor.component.html',
  styleUrls: ['./pick-doctor.component.css']
})

export class PickDoctorComponent {

  public doctors: Doctor[];
  department: Department = new Department(0, "");

  public department_code: number;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.department_code = activateRoute.snapshot.params['department_code'];
    this.getDepartment(this.department_code);

    this.http.get<Doctor[]>(this.baseUrl + 'doctor/dep/' + this.department_code).subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {
        this.http.get<Speciality>(this.baseUrl + 'speciality/' + doc.speciality_code).subscribe(result => {
          doc.speciality = result;
        }, error => console.error(error));
      }, error => console.error(error));
    }, error => console.error(error));
  }

  getDepartment(code: number) {
    this.http.get<Department>(this.baseUrl + 'department/' + this.department_code).subscribe(result => {
      this.department = result;
    }, error => console.error(error));
  }
}
