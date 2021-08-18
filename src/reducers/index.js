import { combineReducers } from 'redux'
import MarkerReducer from './markers'
const reducers = {
    MarkerReducer,
}

const rootReducer = combineReducers(reducers)

export { rootReducer, reducers }
