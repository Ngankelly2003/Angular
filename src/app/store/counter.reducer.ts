import {createReducer, on} from '@ngrx/store';
import { initialState } from './app.state';
import { decrement, increment, reset } from './counter.actions';



export const counterReducer = createReducer(initialState.counter,
    on( increment, (state) => state + 1 ),
    on( decrement, (state) => state - 1 ),
    on( reset, () => 0)
) ; 