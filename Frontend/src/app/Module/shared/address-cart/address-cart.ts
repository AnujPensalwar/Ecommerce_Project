import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-cart',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './address-cart.html',
  styleUrl: './address-cart.css',
})
export class AddressCart {

 @Input() address:any
}
