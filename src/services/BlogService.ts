import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResData } from "../app/shared/types/resData";
import { BlogItem, ProductItems } from "../app/shared/types/productItem";
@Injectable({providedIn:'root'})

export class BlogService { 
    constructor(private http:HttpClient) {  }
    getBlogs(): Observable<ResData<ProductItems[]>> {
        return this.http.get<any>('https://ninedev-api.vercel.app/blogs');
    }
    getBlogById(id:number): Observable<ResData<ProductItems>> {
        return this.http.get<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }
    postBlog(blogItem: BlogItem) : Observable<ResData<ProductItems>> {
        return this.http.post<any>('https://ninedev-api.vercel.app/blogs', blogItem);
    }
    deleteBlog(id:number) : Observable<ResData<ProductItems>> {
        return this.http.delete<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }
}