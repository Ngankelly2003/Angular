import { ProductItems } from "../shared/types/productItem";

export interface AppState { 
    counter:number; 
    blogs: ProductItems[];
}

export const initialState: AppState = {
    counter: 0, 
    blogs: []
}