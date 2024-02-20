import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice.js'; // Adjust the path based on your project structure
import { authApiSlice } from './features/api/authApiSlice.js'; // Adjust the path based on your project structure
import authReducer from './features/auth/authSlice.js'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // these are dynamically named
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      authApiSlice.middleware
    ),
})
