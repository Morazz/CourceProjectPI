import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  public user: PassData = new PassData("", "", "Пациент");

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  addUser() {
    
    this.http.post(this.baseUrl + 'passdata', this.user)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/edit-patient', this.user.login]);
        }, error => console.error(error));
  }
}

export class PassData {
  constructor(public login: string, public password: string, public status: string) { }
}
