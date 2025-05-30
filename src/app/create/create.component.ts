import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../services/BlogService';
import { NgIf } from '@angular/common';
import { BlogItem } from '../shared/types/productItem';
import { Router, } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [
      ReactiveFormsModule,
      NgIf
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  
  product = new FormGroup({
    name : new FormControl('', Validators.required),
    price : new FormControl('',Validators.required)
  })
  constructor(private blogService:BlogService, private router:Router) { 
    this.product = new FormGroup({
      name : new FormControl('', Validators.required),
      price : new FormControl('',Validators.required)
    })
    
  }
  get name() {
    return this.product.get('name');
  }

  get price() {
    return this.product.get('price');
  }

  handleAddCart = () => {
    if(this.name?.hasError('required') || this.price?.hasError('required')) {
      return;
    }
    const blogItem:BlogItem = {
      id: Math.random(),
      title: String(this.name?.value),
      body: String(this.price?.value),
      author: 'mario'

     }
    this.blogService.postBlog(blogItem).subscribe((res :any) => {
     if(res.data.id){
      this.router.navigate(['/']);
     } 
  
  })}
}
