import { SUBMITING, SUBMITED,DROPED_FILE,QUERYED_HISTORY_ORDERS,QUERY_ORDER } from '../actions/order';
import {Map} from 'immutable';

export default function testorder(state = Map({status: null,method:'add'}), action) {
  switch (action.type) {
    case SUBMITING:
      return state;
    case SUBMITED:
      return  Object.assign({}, state, {
                method: 'show',
                values: action.values,
                id: action.lastID
            });
    case DROPED_FILE:
      return Map(state).set('filePath',action.path).set('fileName',action.name).set('status','droped');
    case QUERYED_HISTORY_ORDERS:
      action.rows.forEach((el,index,array)=>{
        array[index] = Map(el)
      })
      return Map(state).set('orders',action.rows).set('status','queryed');
    case QUERY_ORDER:
      return Map(state).set('order',action.row).set('status','queryed');
    default:
      return state
  }
}
