import { combineReducers } from 'redux';
import testReducer from './test-reducer';

const allReducers = {
  test: testReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;