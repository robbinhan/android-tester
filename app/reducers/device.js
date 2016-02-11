import { QUERYING,QUERYED  } from '../actions/devices';
import {Map} from 'immutable';

export default function device(state = Map({status: null}), action) {
  switch (action.type) {
    case QUERYING:
      return  Map(state).set('status','querying');
    case QUERYED:
      return  Map(state).set('status','queryed').set('devices',action.rows);
    default:
      return state;
  }
}
