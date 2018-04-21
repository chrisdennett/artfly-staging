import { NOTIFICATION, NOTIFICATION_COMPLETE } from '../actions/UserDataActions';

export default function (state = [], action) {
    switch (action.type) {

        case NOTIFICATION:
            const arr = state.concat();
            arr.unshift(action.payload);
            return arr;

        case NOTIFICATION_COMPLETE:
            let arr2 = state.concat();
            // find notification with matching timestamp and remove it
            const {timeStamp} = action.payload;
            arr2 = arr2.filter(notification => notification.timeStamp !== timeStamp)

            return arr2;

        default:
            return state;
    }
}