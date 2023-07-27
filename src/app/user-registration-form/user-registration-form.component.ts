import { Component, OnInit, Input } from '@angular/core';
// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { RetrivingServiceAPIDataService } from '../retrieve-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {Username: '', Password: '', Email: '', Birthday: '' };
  constructor(
    public retrievingServiceApiData: RetrivingServiceAPIDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar ) { }
    ngOnInit(): void {
    }
    // function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.retrievingServiceApiData.userRegistration(this.userData).subscribe((response) => {
      // logic for successful user registration
      this.dialogRef.close(); // close dialog on success
      console.log(response);
      this.snackBar.open('user registration successful', 'OK', {
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
