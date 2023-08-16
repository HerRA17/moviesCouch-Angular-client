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

/** Component for displaying and managing user profile information */
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
/** Makes call of the get user function
 * @returns user object, extracted data from th euser object (Username, Email, Birthdate), and the array containing favorite movies
 */
getUserInfo(): any {
    this.retrievingServiceApiData.getUser().subscribe((user) =>{
      this.user = user;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.userData.Birthdate = this.user.Birthdate;
      this.retrievingServiceApiData.getAllMovies().subscribe((response: any) => {
        this.favoriteMovies = response.filter((movie: any)=> this.user.FavoriteMovies.includes(movie._id))
        return this.user;
      });
    });
  }

/** Makes call of the edit user function
 * @params user object
 * @returns user object with the edited data
*/
updateUser(): void{
  this.retrievingServiceApiData.editeUser(this.userData).subscribe((result) => {
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

/** Makes call of the delete user function and redirects to the Welcome page
 */
deleteAccount(): void {
this.retrievingServiceApiData.deleteUser().subscribe((result) => {
  localStorage.clear();
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