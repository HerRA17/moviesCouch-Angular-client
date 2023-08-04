import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() user: any;
   
  constructor(
    private router: Router,
    private  renderer: Renderer2
  ) {}
  ngOnInit(): void {
    // span identifier fro visual hidden
    const spanElement = document.querySelector('.icon-reader');
    // adding cdk-visually-hidden class
    this.renderer.addClass(spanElement, 'cdk-visually-hidden');  
  }

    toMovies(): void{
      this.router.navigate(['/Movies']);
    }

    toProfile(): void{
      this.router.navigate(['/Profile']);
    }

    logOut(): void{
      this.router.navigate(['/Welcome']);
      localStorage.clear();
    }
}
