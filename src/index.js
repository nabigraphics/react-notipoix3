'use strict';
import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './reducers';
import * as actions from './actions';
import Notification from './Notification';


function add_notify(color="default",key,message,timer=5000) {
    store.dispatch(actions.notify_add(color,key,message));
}
function remove_notify(key){
    const notification = store.getState().notification.get('notification');
    const itemnum = notification.findIndex(item => {return item.get('key') === key});
    const itemcheck = notification.getIn([itemnum,'isClosed']);
    if(itemcheck == false){
        store.dispatch(actions.notify_removing(key));
        store.dispatch(actions.notify_remove(key));
    }
}
function removeall_notify(){
    const size = store.getState().notification.get('notification').size;
    if(size != 0){
        store.dispatch(actions.notify_remove_all());        
    }
}
const store = createStore(reducers);

class Notipoix3 extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Notification position={this.props.position} />
            </Provider>
        );
    }
}
const notipoi = {
    add:add_notify,
    remove:remove_notify,
    removeall:removeall_notify
}
module.exports = {
    Notipoix3,notipoi
}