import { combineReducers } from 'redux';
import testorder from './order';
import device from './device';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  device,
  orderstate: testorder,
  form: formReducer
});

export default rootReducer;
