import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
/** Component displaying  information about director */
export class DirectorComponent {
constructor(
  /** Injects data about the director into the component.
   * @params The data object containing genre information: Name, Bio, Birthdate & Deathdate 
   */
  @Inject(MAT_DIALOG_DATA)
    public data: {
      Bio: string,
      Birthdate: string,
      Deaththdate: string,
      Name: string
    }
  ) {}
}
