import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
/** Component displaying information about genre */
export class GenreComponent {
constructor(
  /** Injects data about the genre into the component.
   * @params The data object containing genre information: Name & Description 
   */
  @Inject(MAT_DIALOG_DATA)
  public data: {
    Name: string,
    Description: string
  }
) {}
}