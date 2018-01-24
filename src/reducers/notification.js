import { Map, List } from 'immutable';
import * as types from '../actions/ActionTypes';
const initialState = Map({
    notification:List(),
    happy:"^^"
})

export default function (state = initialState, action) {
    const notification = state.get('notification');
    switch(action.type){
        case types.NOTIFY_ADD:
            return state.set('notification', notification.push(Map({key:action.key,data:Map({color:action.color,message:action.message}),isClosed:false})));
        case types.NOTIFY_REMOVING:
            return state.set('notification',notification.setIn([notification.findIndex(item => {return item.get('key') === action.key}),'isClosed'],true));
        case types.NOTIFY_REMOVE:
            return state.set('notification',notification.delete(notification.findIndex(item => {return item.get('key') === action.key})));
        case types.NOTIFY_REMOVE_ALL:
            return state.set('notification',List());
        default :
            return state;
    }
}