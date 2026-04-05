import { type ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '@/redux/rootReducer';

export function createTestStore(preloadedState?: { auth?: { isAuthenticated: boolean } }) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export function withProviders(
  ui: ReactElement,
  options?: {
    store?: ReturnType<typeof createTestStore>;
    initialRoute?: string[];
    preloadedState?: { auth?: { isAuthenticated: boolean } };
  },
) {
  const store = options?.store ?? createTestStore(options?.preloadedState);
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={options?.initialRoute ?? ['/']}>{ui}</MemoryRouter>
    </Provider>
  );
}
