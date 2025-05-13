import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/BlogService';
import { ProductItems } from '../shared/types/productItem';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  id = '' ; 
  productItem : ProductItems = { 
    id: 0 ,
    image: '',
    name: '',
    price: 0,
  };

  constructor(private route: ActivatedRoute, private blogService:BlogService ) {
    this.id = String(route.snapshot.paramMap.get('id'))
  }

  ngOnInit():void {
   this.blogService.getBlogById(+this.id).subscribe((resData:any) => {
      this.productItem.id = resData.data.id;
      this.productItem.name = resData.data.title;
      this.productItem.price = Number(resData.data.body);
      this.productItem.image = 'assets/images/samba.png';
      // console.log("Data API: ",this.productItem);
    });
  } 
}
