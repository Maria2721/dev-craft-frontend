import { combineReducers } from '@reduxjs/toolkit';

import aiReducer from '@/redux/slices/aiSlice';
import authReducer from '@/redux/slices/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ai: aiReducer,
});

export { rootReducer };
