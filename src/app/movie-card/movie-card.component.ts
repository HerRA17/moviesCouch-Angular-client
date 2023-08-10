import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
// imported TS components
import { RetrivingServiceAPIDataService } from '../retrieve-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  Movies: any = [];
  favoriteMovies: any[] = [];

  constructor(
    public retrivingServiceApiData :RetrivingServiceAPIDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}
    
  ngOnInit(): void {
    this.getMovies()
    }

 
  
  //movies CRUD operations 
  getMovies(): void {
    this.retrivingServiceApiData.getAllMovies().subscribe((resp: any) => {
      console.log('Movies', resp);
      this.Movies = resp;
      return this.Movies;
    })
  }
  getMovie(Title: string): void{
    this.retrivingServiceApiData.getMovie(Title).subscribe((resp: string) => {
      console.log('Title', resp);
      this.Movies = resp;
      return this.Movies;
    })
  }
  
  getDirector(Name: string, Bio: string, Birthdate: string, Deaththdate: string): void {
    this.dialog.open(DirectorComponent, {
      data:{
        Name: Name,
        Bio: Bio,
        Birthdate: Birthdate,
        Deaththdate: Deaththdate  
    },
      width: '25rem'
    });
  }

  getGenre(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: Name,
        Description: Description
      },
      width: '25rem'
    });
  }

  getSynopsis(Title: string, Description: string): void {
    this.dialog.open(MovieDetailsComponent,  {
      data: {
        Title: Title,
        Description: Description 
      },
      width: '25rem'
    });
  }
  // Fav Movies CRUD operations
  addFavoriteMovies(MovieID: string): void{
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    console.log('token', token);
    console.log('MovieID', MovieID);
    console.log('username', username);
    if (username) {
      this.retrivingServiceApiData.addFavMovie(username, MovieID).subscribe((resp) => {
        console.log(resp)
        this.snackBar.open('Movie has been added to favorite Movies', 'OK', {
          duration: 2000
        });
        this.favoriteMovies = resp.FavoriteMovies;
      })
    } 
  }

  isFavMovie(MovieID: string): boolean {
    return this.favoriteMovies.includes(MovieID);
  }

  deleteFavoriteMovies(MovieID: string): void {
    let username = localStorage.getItem('user');
    console.log('username', username);
    if (username) {
      this.retrivingServiceApiData.deleteFavMovie(username, MovieID).subscribe((resp) => {
        this.snackBar.open('Movie removed from favorite Movies', 'OK', {
          duration: 2000
        })
        this.favoriteMovies = resp.FavoriteMovies;
    });
    }
}
}