import * as types from './ActionTypes';

export function notify_add(color,key,message) {
    return {
        type: types.NOTIFY_ADD,
        color,
        key,
        message
    };
}

export function notify_remove(key) {
    return {
        type: types.NOTIFY_REMOVE,
        key
    };
}
export function notify_removing(key) {
    return {
        type: types.NOTIFY_REMOVING,
        key
    };
}
export function notify_remove_all() {
    return {
        type: types.NOTIFY_REMOVE_ALL
    };
}