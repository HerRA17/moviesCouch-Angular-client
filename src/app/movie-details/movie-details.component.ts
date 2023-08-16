import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
/** Component displaying information about movie details */
export class MovieDetailsComponent {
constructor(
  /** Injects data about movie details into the component.
   * @params The data object containing genre information: Titlee & Description 
   */
  @Inject(MAT_DIALOG_DATA)
  public data: {
    Title: string,
    Description: string
  }
) {}
}
