import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import {FormsModule } from '@angular/forms'
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '../pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../pipes/UpperCasePipe.pipe';
import { ProductItems } from '../types/productItem';


@Component({
  selector: 'app-product-item',
  imports: [   
    FormsModule,
    CurrencyPipe,
    UpperCasePipe,
    NgFor,
    RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() products: ProductItems[] = [];
  @Output() dataEvent = new EventEmitter<number>();

  get totalPrice(): string {
    const sum = this.products.reduce((total, item) =>{
       return total + item.price;
    },0);
    return `Total Price: ${sum}` ;
  }

  handleDelete = (id: number) => {
     this.dataEvent.emit(id);
  }  

  ngOnChanges(changes:SimpleChanges):void {
    console.log(changes['products'].currentValue);
    console.log(changes['products'].previousValue);
  }

 ngOnDestroy():void { 
    console.log('HomeComponent ngOnDestroy removed');
  }
 
}
