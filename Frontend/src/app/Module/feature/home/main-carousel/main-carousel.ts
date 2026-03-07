import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { homeCarouselData } 
from '../../../../data/images/maincarousel';



@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-carousel.html',
  styleUrls: ['./main-carousel.css']
})
export class MainCarousel implements AfterViewInit, OnDestroy {

  @ViewChild('carouselContainer') container!: ElementRef;

  carouselData = homeCarouselData;

  currentSlide = 0;
  containerWidth = 0;
  intervalId:any;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {

    // Get real width
    this.containerWidth =
      this.container.nativeElement.offsetWidth;

    this.startSlider();
  }

  startSlider() {

    this.intervalId = setInterval(() => {

      this.currentSlide =
        (this.currentSlide + 1) % this.carouselData.length;

      this.cd.detectChanges();

    }, 2500);

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
