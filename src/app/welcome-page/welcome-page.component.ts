import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {

  }
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