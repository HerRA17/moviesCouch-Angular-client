import { Component, OnInit } from '@angular/core';
import { RetrivingServiceAPIDataService } from '../retrieve-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  Movies: any[] = [];
  
  constructor(public retrivingServiceApiData :RetrivingServiceAPIDataService) {}
  ngOnInit(): void {
    this.getMovies();
    this.getMovie();
    this.getDirector();
    this.getGenre();
    }
  getMovies(): void {
    this.retrivingServiceApiData.getAllMovies().subscribe((resp: any) => {
      this.Movies = resp;
      console.log(this.Movies);
      return this.Movies;
    })
  }
  getMovie(Title: string): void{
    this.retrivingServiceApiData.getMovie(MoviesTitle).subscribe((resp: string) => {
      this.Movies = resp;
      console.log(this.Movies);
      return this.Movies;
    })
  }
  getDirector(Director: object, Name:string): void {
    this.retrivingServiceApiData.getDirector(Drirector, Name).subscribe((resp: object) => {
      this.Director = resp;
      console.log(this.Director);
      return this.getDirector;
    })

  }
  getGenre(Genre: object, Name: string): void {
    this.retrivingServiceApiData.getGenre(Genre, Name).subscribe((resp: object) => {
      this.Genre = resp;
      console.log(this.Genre);
      return this.Genre;
    })
  }

  getSynopsis(Description: string): void {
    this.retrivingServiceApiData.getSynopsis(Description).subscribe((resp: string) => {
      this.Description = resp;
      console.log(this.Description);
      return this.Description;
    })
  }
}