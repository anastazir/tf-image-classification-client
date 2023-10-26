import { FETCH_LABELS, ERROR } from '../constants/modalTypes';
import * as api from '../api/index.js';

export const fetchLabels = (style) => async (dispatch) => {
    try {

      const {data: { lables } } = await api.fetch_labels(style);
      
      dispatch({ type: FETCH_LABELS, data: lables });
    } catch (error) {
      dispatch({ type: FETCH_LABELS, data: ['No Labels Available'] });
      dispatch({ type: ERROR, error });
    }
}