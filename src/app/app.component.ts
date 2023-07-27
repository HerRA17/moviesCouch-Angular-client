import { Component } from '@angular/core';
import { RetrivingServiceAPIDataService } from './retrieve-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moviesCouch-Angular-client';

  constructor(public dialog: MatDialog) {}
  // function opens dialog when sign up button is clicked
  openUserRegistration(): void{
      this.dialog.open(UserRegistrationFormComponent, {
        width: '290px'
      });
  }
  // function opens dialog when login button is clicked
  openUserLogin(): void{
    this.dialog.open(UserLoginFormComponent, {
      width: '290px'
    })
  }
}
