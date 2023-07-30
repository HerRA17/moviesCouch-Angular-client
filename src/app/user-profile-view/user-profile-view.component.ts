import { Component, OnInit, Input } from '@angular/core';
// This import brings in the API calls
import { RetrivingServiceAPIDataService } from '../retrieve-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// import router
import { Router } from '@angular/router';
// date formating
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss']
})
export class UserProfileViewComponent implements OnInit{
user: any = { };
favoriteMovies: any = [];

@Input() userData = {Username: '', Password: '', Email: '', Birthday: ''}
constructor(
    public retrievingServiceApiData: RetrivingServiceAPIDataService,
    public snackBar: MatSnackBar,
    private router: Router
) {}

ngOnInit(): void{
this.getUser();
}

getUser(): void {
  this.retrievingServiceApiData.getUser().subscribe((user) => {
    console.log(user);
    this.user = user;
    this.userData.Username = this.user.Username
    this.userData.Email = this.user.Email
    this.userData.Birthday = formatDate(this.user.Birthday, 'dd-mm-yyyy', '', '')
    this.retrievingServiceApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: {_id: any}) => this.user.favoriteMovies.indexOf(m._id) >= 0)
    })
  })
}

updateUser(userDetails: any): void{
  this.retrievingServiceApiData.editUser(userDetails).subscribe((result) => {
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result));
    this.snackBar.open('User successfullyupdated', 'OK', {
      duration: 2000
    });
  }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}

deleteUser(userDetails: any): void {
this.retrievingServiceApiData.deleteUser(userDetails).subscribe((result) => {
  console.log(result);
  localStorage.clear;
  this.router.navigate(['welcome']);
  this.snackBar.open('User successfully deleted', 'OK', {
    duration: 2000
  });
}, (result) => {
  this.snackBar.open(result , 'OK' , {
    duration: 2000
  })
})
}

}
