import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Schedule, Speciality } from '../admin/doctor/doctors-list/doctors-list.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddUserComponent } from '../admin/user/add-user/add-user.component';
import { AddHospitalComponent } from '../admin/hospital/add-hospital/add-hospital.component';
import { Hospital } from '../admin/hospital/hospitals-list/hospitals-list.component';
import { DeleteDialogComponent } from '../admin/delete-dialog/delete-dialog.component';
import { hosp_type } from '../../globals';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public hospitals: Hospital[];
  public doctors: Doctor[];
  public schedule: Schedule[];
  public hosp_type: string[] = hosp_type;
  selected_filters: { id: number; label: string; selected: boolean; }[];
  filtered_hospitals: Hospital[] = [];

  types = [
    { id: 0, label: hosp_type[0], selected: false },
    { id: 1, label: hosp_type[1], selected: false },
    { id: 2, label: hosp_type[2], selected: false }
  ]

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, @Inject('BASE_URL') private baseUrl: string,
    private dialog: MatDialog, fb: FormBuilder) {

    this.getHospitals();
  }

  getHospitals() {
    this.http.get<Hospital[]>(this.baseUrl + 'hospital').subscribe(result => {
      this.hospitals = result;
      this.hospitals.forEach(hp => {
        this.http.get<Schedule>(this.baseUrl + 'schedule/' + hp.schedule_code).subscribe(result => {
          hp.hours = result;
          console.log(result);
        }, error => console.error(error));
      })
    }, error => console.error(error));
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '25%';
  }

  onInput(text: string) {
    if (text.length > 0) {
      this.hospitals = this.hospitals.filter(hp => hp.hospital_name.toLowerCase().includes(text.toLowerCase()));
    }
    else this.getHospitals();
  }

  onToggle(s: string) {

    this.filtered_hospitals = [];

    this.selected_filters = this.types.filter(s => {
      return s.selected;
    });

    this.selected_filters.forEach(s =>
      this.filtered_hospitals = this.filtered_hospitals.concat(this.hospitals.filter(hp => hp.hospital_type.includes(s.label))));
    console.log(this.filtered_hospitals);

  }

 
}

