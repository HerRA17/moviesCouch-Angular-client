import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { RetrivingServiceAPIDataService } from '../retrieve-api-data.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
/** Welcome page where user can register or login*/
export class WelcomePageComponent {
  public slides = [
    {src: "assets/img-carousel/previewAInfinityW.png"},
    {src: "assets/img-carousel/previewEpisode3.png"},
    {src: "assets/img-carousel/previewEpisode5.png"},
    {src: "assets/img-carousel/previewLOTR.png"},
  ];
  constructor(
      public dialog: MatDialog
      ){}
  
  
  ngOnInit(): void {
  }

 /** opens registration dialog */
  openUserRegistration(): void{
    this.dialog.open(UserRegistrationFormComponent, {
      width: '20rem'
    });
  }
  /**  opens login dialog */
  openUserLogin(): void{
  this.dialog.open(UserLoginFormComponent, {
    width: '20rem'
  })
}
}