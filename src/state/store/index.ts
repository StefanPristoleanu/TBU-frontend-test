import {
  configureStore,
  EnhancedStore,
  combineReducers,
} from '@reduxjs/toolkit';

import { autocompleteResultsReducer } from '../reducers/searchReducers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: EnhancedStore<RootState, any, any> | null = null;

export const getStore = () => {
  if (store === null) {
    store = configureStore({
      reducer: getRootReducer(),
      preloadedState: {},
    });
  }
  return store;
};

export const getRootReducer = () =>
  combineReducers({
    autocompleteResults: autocompleteResultsReducer,
  });

export type RootState = ReturnType<ReturnType<typeof getRootReducer>>;
