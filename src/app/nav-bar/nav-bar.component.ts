import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(
    private router: Router
  ) {}
  ngOnInit(): void {
    }

    toMovies(): void{
      this.router.navigate(['Movies']);
    }

    toProfile(): void{
      this.router.navigate(['Profile']);
    }

    logOut(): void{
      this.router.navigate(['Welcome']);
      localStorage.clear();
    }
}
