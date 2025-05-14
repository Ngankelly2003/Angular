import {createReducer, on} from '@ngrx/store';
import { initialState } from '../app.state';
import { setListBlog } from './blog.actions';
import { ProductItems } from '../../shared/types/productItem';

export const blogReducer = createReducer(
    initialState.blogs,
    on(setListBlog, (state: ProductItems[], action) => {
        return action.blogs;
    }) 
)