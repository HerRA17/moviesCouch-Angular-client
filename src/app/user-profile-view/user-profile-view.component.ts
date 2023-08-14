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
user: any;
favoriteMovies: any = [];

@Input() userData = {Username: '', Password: '', Email: '', Birthdate: ''}
constructor(
    public retrievingServiceApiData: RetrivingServiceAPIDataService,
    public snackBar: MatSnackBar,
    private router: Router
) {}

ngOnInit(): void{
  this.getUserInfo();
}

getUserInfo(): any {
    this.retrievingServiceApiData.getUser().subscribe((user) =>{
      console.log('user', user);
      this.user = user;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.userData.Birthdate = this.user.Birthdate;
      this.retrievingServiceApiData.getAllMovies().subscribe((response: any) => {
        console.log('Response: ', response)
        console.log('User favorite movies' , this.user.favoriteMovies)
        this.favoriteMovies = response.filter((movie: any)=> this.user.FavoriteMovies.includes(movie._id))
        console.log('Favorite movies after filtering', this.favoriteMovies);
        console.log('User after filtering', this.user);
      return this.user;
      });
    });
  }


updateUser(): void{
  this.retrievingServiceApiData.editeUser(this.userData).subscribe((result) => {
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result));
    this.snackBar.open('User successfully updated', 'OK', {
      duration: 2000
    })
  }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}


deleteAccount(): void {
this.retrievingServiceApiData.deleteUser().subscribe((result) => {
  localStorage.clear();
  console.log(result);
  this.router.navigate(['Welcome']);
  this.snackBar.open(result.message, 'OK', {
    duration: 2000
  });
}, (result) => {
  this.snackBar.open(result.message , 'OK' , {
    duration: 2000
  })
})
}

}