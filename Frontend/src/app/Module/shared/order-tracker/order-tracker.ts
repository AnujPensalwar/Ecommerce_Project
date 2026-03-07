import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-tracker',
  standalone:true,
  imports: [MatIcon,MatDivider,CommonModule],
  templateUrl: './order-tracker.html',
  styleUrl: './order-tracker.css',
})
export class OrderTracker {

  @Input() activeStep:any
  @Input() steps:any

}
