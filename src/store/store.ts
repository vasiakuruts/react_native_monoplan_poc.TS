import { createStore } from 'redux';
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from './reducer';

export const store = createStore(
  reducer,
  {},
  composeWithDevTools(),
);

export const persistor = persistStore(store);
