import { AnyAction } from '@reduxjs/toolkit';
import { INITIAL_STORE_STATE } from '../../utils/constants';
import {
  FETCH_AUTOCOMPLETE_CALL_FAILURE,
  FETCH_AUTOCOMPLETE_CALL_STARTED,
  FETCH_AUTOCOMPLETE_CALL_SUCCESS,
} from '../actions/searchActions';

export const autocompleteResultsReducer = (
  state = INITIAL_STORE_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_AUTOCOMPLETE_CALL_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_AUTOCOMPLETE_CALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        autocompleteResultList: [],
      };
    case FETCH_AUTOCOMPLETE_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        autocompleteResultList: action.payload.autocompleteResultList,
      };
    default:
      return state;
  }
};
