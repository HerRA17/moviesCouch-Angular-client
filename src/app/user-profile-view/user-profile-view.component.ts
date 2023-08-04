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
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss']
})
export class UserProfileViewComponent implements OnInit{
user: any = { };
favoriteMovies: any = [];

@Input() userData = {Username: '', Password: '', Email: '', Birthdate: ''}
constructor(
    public retrievingServiceApiData: RetrivingServiceAPIDataService,
    public snackBar: MatSnackBar,
    // public dialogRef: MatDialogRef,
    private router: Router
) {}

ngOnInit(): void{
  this.getUserInfo();
  this.getFavoriteMovies();


  // Subscribe to favoriteMovies updates
  this.retrievingServiceApiData.updateUserObject.subscribe(() => {
    this.getUserInfo();
    this.getFavoriteMovies();
  })
}

getUserInfo(): string | undefined {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      return this.user; 
    } else { 
      this.router.navigate(['welcome']);
      return
    }
  }

getUpdatedUserDetails(): any {
  let updateUserData: {
    Username?: string;
    Password?: string;
    Email?: string;
    Birthdate?: string;
  } = {};
  
  if (this.userData.Username !== '') {
    updateUserData.Username = this.userData.Username;
  } if (this.userData.Password !== '') {
    updateUserData.Password = this.userData.Password;
  } if (this.userData.Email !== '') {
    updateUserData.Email = this.userData.Email;
  } if (this.userData.Birthdate !== '') {
    updateUserData.Birthdate = this.userData.Birthdate;
  }
  return Object.keys(updateUserData).length === 0 ? null : updateUserData;
}

updateUser(): void{
  const updateUserData = this.getUpdatedUserDetails();
  if (!updateUserData) {
    this.snackBar.open('No changes to update!', 'OK', {
      duration: 2000
    });
    return;
  }
  this.retrievingServiceApiData.editeUser(updateUserData).subscribe({
    next: (result) => {
      console.log(result);
      // this.dialogRef.close();
      this.snackBar.open('Update successfull!', 'OK', {
        duration: 2000
      });
      localStorage.setItem('user', JSON.stringify(result));
      this.retrievingServiceApiData.updateUserObject.next();
    },
    error: (error) => {
      let errorMessage = error.Message;
      console.error(errorMessage);
      this.snackBar.open(errorMessage, 'OK', {
        duration: 2000
      });
    }
  });
}

getFavoriteMovies() {
  const usersFavoriteMovies =  this.user.favoriteMovies;
  this.retrievingServiceApiData.getAllMovies().subscribe((resp) => {
    console.log('getFavoriteMovies response: ' + resp);
    this.favoriteMovies = usersFavoriteMovies.map((MovieID: string) => {
      return resp.find((Movie: any) => Movie._id === MovieID)
    });
    console.log('this are the favorite movies: ' + this.favoriteMovies)
  });
}


deleteAccount(): void {
this.retrievingServiceApiData.deleteUser().subscribe((result) => {
  console.log(result);
  localStorage.clear();
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
