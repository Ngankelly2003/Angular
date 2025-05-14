import { createAction,props} from '@ngrx/store'; 
import { ProductItems } from '../../shared/types/productItem';

export const setListBlog = createAction(
    '[Blog] SetListBlog',
    props<{blogs: ProductItems[]}>()
)