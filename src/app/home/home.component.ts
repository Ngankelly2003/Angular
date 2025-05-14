import { Component } from '@angular/core';
import { ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/product-item.component';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/BlogService';
import { map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { stat } from 'fs';
import { setListBlog } from '../store/BlogStore/blog.actions';

@Component({
  selector: 'app-home',
  imports: [ 
    ProductItemComponent,
    NgIf,
    CommonModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isDisable = false;
  isVisable = true;
  getBlogApi : Subscription ;
  products:ProductItems[] = [];
  blogs$:Observable<ProductItems[]> | undefined;


  constructor(private blogService:BlogService,private store: Store<AppState>) { 
    console.log('HomeComponent constructor called');
    this.getBlogApi = new Subscription();
    this.blogs$ = this.store.select(state => state.blogs);
  }

  handleDelete = (id:number) =>{
  //   this.blogService.deleteBlog(id).subscribe((res:any) => {
  //     if(res.data ===1){    
  //       this.products = this.products.filter((item) => item.id !== id);
  //     } 
  // }
  let currentBlogs :ProductItems[] = [];
  this.store.select(state => state.blogs)
  .subscribe((res) => {
    currentBlogs = res;
  });
  this.blogService.deleteBlog(id).subscribe((res:any) => {
    if(res.data ===1){  
      const updatedBlogs = currentBlogs.filter((item) => item.id !== id);
      this.store.dispatch(setListBlog({blogs:updatedBlogs}));
}})
}


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
      this.store.dispatch(setListBlog({blogs:resData}));
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
