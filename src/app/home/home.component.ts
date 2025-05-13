import { Component } from '@angular/core';
import { ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/product-item.component';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/BlogService';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ 
    ProductItemComponent,
    NgIf
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isDisable = false;
  isVisable = true;
  getBlogApi : Subscription ;
  products:ProductItems[] = [
    // {id:1,name:'samba og', price:400000, image:'assets/images/samba.png' },
    // {id:2,name:'nike og', price:300000, image:'assets/images/samba.png' },
    // {id:3,name:'adidas og', price:500000, image:'assets/images/samba.png' },
    // {id:4,name:'youdy og', price:600000, image:'assets/images/samba.png' }
  ]
  constructor(private blogService:BlogService) { 
    console.log('HomeComponent constructor called');
    this.getBlogApi = new Subscription();
  }

  handleDelete = (id:number) =>{
    this.blogService.deleteBlog(id).subscribe((res:any) => {
      if(res.data ===1){    
        this.products = this.products.filter((item) => item.id !== id);
      } 
  }) }


  // ngOnInit chạy ngay sau khi html được render
  // ngOnInit là nơi để khởi tạo các biến, gọi API, ...
  ngOnInit():void {
    console.log('HomeComponent ngOnInit called');
    this.getBlogApi = this.blogService.getBlogs().pipe(
      map((res) => {
        return res.data.map((item:any) => {
        return {
          ...item,
          name: item.title,
          price:Number(item.body),
          image: 'assets/images/samba.png',
        }
      }).filter((product) => product.price > 300000);})
    ).subscribe((resData) => {
      this.products = resData;
      // console.log("Data API: ",this.products);
    });
  }
 

  //ngDoCheck chạy mỗi khi có sự thay đổi trong component
  // ngDoCheck là nơi để kiểm tra sự thay đổi của các biến trong component
  ngDoCheck():void {
    console.log('HomeComponent ngDoCheck called');
  }



  handleDestroy = () => { 
    this.isVisable = !this.isVisable;
  }

  onDestroy():void { 
    if(this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log('HomeComponent ngOnDestroy removed');
    }
  }


}
