import { Component, OnInit, Input } from '@angular/core';
// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls 
import { RetrivingServiceAPIDataService } from '../retrieve-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// import router
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = {Username: '', Password: ''};
  constructor(
    public retrievingServiceApiData: RetrivingServiceAPIDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router ) {  } 
    ngOnInit(): void{ 
    }
    // function responsible for sending the form inputs to the backend
    loginUser(): void {
      this.retrievingServiceApiData.userLogin(this.loginData).subscribe((response) => {
        localStorage.setItem('Username', response.user.Username);
        localStorage.setItem('token', response.token);
        this.router.navigate(['Movies']);
        // logic for successful login
        this.dialogRef.close() //close dialog on success
        console.log(response);
        this.snackBar.open('Welcome back', 'Ok', {
          duration: 2000
        });
      }, (response) => {
          console.log(response);
          this.snackBar.open(response, 'OK', {
          duration: 2000
      })
      });
    }
}
