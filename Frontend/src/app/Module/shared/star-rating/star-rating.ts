import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-star-rating',
  standalone:true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating {

  maxRating=5;
  initialRating=3;

  stars:any
  currentRating=0;

  constructor(){
    this.stars=Array(this.maxRating).fill(0).map((_,i)=>i+1);
    this.currentRating=this.initialRating
  }

  rate(rating:number){
    this.currentRating=rating;
  }
}
