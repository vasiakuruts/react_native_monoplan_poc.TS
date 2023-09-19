import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import { RootState } from './store.types';

import { authReducer } from './auth/reducer';
import { userReducer } from './user/reducer';
import { statementReducer } from './statement/reducer';
import { planningReducer } from './planning/reducer';
import { categoriesReducer } from './categories/reducer';
import { globalReducer } from './global/reducer';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
};

const planningPersistConfig = {
  key: 'planning',
  storage: storage,
};

const categoriesPersistConfig = {
  key: 'categories',
  storage: storage,
};

export const reducer = combineReducers<RootState>({
  auth: persistReducer(authPersistConfig, authReducer) as any,
  user: userReducer,
  statement: statementReducer,
  planning: persistReducer(planningPersistConfig, planningReducer) as any,
  categories: persistReducer(categoriesPersistConfig, categoriesReducer) as any,
  global: globalReducer,
});