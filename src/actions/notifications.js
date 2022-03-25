import { REMOVE } from '../constants/modalTypes';

export const removeNotification = (notification) => (dispatch) => {
    dispatch({type : REMOVE, data : notification})
}