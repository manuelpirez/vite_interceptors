RTK Query includes these APIs:

- createApi(): The core of RTK Query's functionality. 
        - It allows you to define a set of "endpoints" that describe 
            - how to retrieve data from backend APIs and other async sources, including the configuration of how to fetch and transform that data. 
            - In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.

- fetchBaseQuery(): A small wrapper around fetch that aims to simplify requests. 
        - Intended as the recommended baseQuery to be used in createApi for the majority of users.

- <ApiProvider />: Can be used as a Provider if you do not already have a Redux store.

-  setupListeners(): A utility used to enable refetchOnMount and refetchOnReconnect behaviors.

```
import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react'
```


Bundle size
    If you are using RTK already: ~9kb for RTK Query and ~2kb for the hooks.
    If you are not using RTK already:
        Without React: 17 kB for RTK+dependencies+RTK Query
        With React: 19kB + React-Redux, which is a peer dependency

Modernizing Redux

    Replace the existing manual Redux store setup with Redux Toolkit's configureStore
    Pick an existing slice reducer and its associated actions. Replace those with RTK's createSlice. Repeat for one reducer at a time.
    As needed, replace existing data fetching logic with RTK Query or createAsyncThunk
    Use RTK's other APIs like createListenerMiddleware or createEntityAdapter as needed        