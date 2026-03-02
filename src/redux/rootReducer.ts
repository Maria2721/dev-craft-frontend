import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/redux/slices/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export { rootReducer };
