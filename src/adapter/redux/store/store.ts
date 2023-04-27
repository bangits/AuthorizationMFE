import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import * as apiReducers from '../api';
import rootReducer from './rootReducer';

const configLogger = () => (process.env.logger ? [logger] : []);

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      [
        ...getDefaultMiddleware(),
        ...Object.values(apiReducers).map((api) => api.middleware),
        ...configLogger()
      ] as ReturnType<typeof getDefaultMiddleware>
  });
};

export default createStore;
