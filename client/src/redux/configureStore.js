import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './ducks/auth';
import errorReducer from './ducks/errors';

const rootReducer=combineReducers({
    auth: authReducer,
    errors: errorReducer
});

const middlewares=[ thunk];


const store= createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;