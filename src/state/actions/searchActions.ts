import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAutocompleteResults } from '../../api/AutocompleteAPI';
import { AutocompleteResultType } from '../../utils/types';

export const FETCH_AUTOCOMPLETE_CALL_STARTED =
  'FETCH_AUTOCOMPLETE_CALL_STARTED';
export const FETCH_AUTOCOMPLETE_CALL_SUCCESS =
  'FETCH_AUTOCOMPLETE_CALL_SUCCESS';
export const FETCH_AUTOCOMPLETE_CALL_FAILURE =
  'FETCH_AUTOCOMPLETE_CALL_FAILURE';

type Props = {
  searchTerm: string;
  numberOfResultsRequired: number;
};

export const useFetchAutocompleteResults = () => {
  const dispatch = useDispatch();
  const fetchAutocompleteResultsMemo = useCallback(
    ({ searchTerm, numberOfResultsRequired }: Props) => {
      dispatch(fetchAutocompleteCallStarted());
      return getAutocompleteResults({ searchTerm, numberOfResultsRequired })
        .catch(error => {
          dispatch(fetchAutocompleteCallFailure(error));
        })
        .then(response => {
          if (response) {
            const { docs: autocompleteResultList } = response.data.results;
            dispatch(fetchAutocompleteCallSuccess(autocompleteResultList));
          }
        });
    },
    [dispatch]
  );
  return { fetchAutocompleteResults: fetchAutocompleteResultsMemo };
};

export const fetchAutocompleteCallStarted = () => {
  return {
    type: FETCH_AUTOCOMPLETE_CALL_STARTED,
  };
};

export const fetchAutocompleteCallSuccess = (
  autocompleteResultList: AutocompleteResultType[]
) => {
  return {
    type: FETCH_AUTOCOMPLETE_CALL_SUCCESS,
    payload: { autocompleteResultList },
  };
};

export const fetchAutocompleteCallFailure = (error: Error) => {
  return {
    type: FETCH_AUTOCOMPLETE_CALL_FAILURE,
    payload: JSON.stringify(error),
  };
};
