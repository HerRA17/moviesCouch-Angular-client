import { animate, trigger, transition, style, useAnimation } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { scaleIn, scaleOut } from './carousel.animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(scaleIn, {params: {time: "1300ms"}} )]),
      transition("* => void", [useAnimation(scaleOut, {params: {time: "1300ms"}} )])
    ])
  ]
})

export class CarouselComponent {
  @Input() movies: any[] | undefined = [];
  
  currentSlide = 0;

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? (this.movies?.length || 0) - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.movies?.length ? 0 : next;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

}
