// RTK is specifically for React
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authSlice";

const BASE_URL = 'http://localhost:3000'
const REFRESH_ENDPOINT = '/refresh'

// override fetchBaseQuery to always send token when available
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken
        if (accessToken) {
            headers.set("autorization", `Bearer ${token}`)
        }
        return headers
    }
})

// wrapper

const baseQueryWithReauth = async (args, api, extraOptions)=>{
    let result = await baseQuery(args, api, extraOptions)

    // look for a 403
    if(result?.error?.originalStatus === 403){
        console.log('REFRESHING')
        const refreshResult = await baseQuery(REFRESH_ENDPOINT, api, extraOptions)
        console.log(refreshResult)

        if(refreshResult?.data){
            // we're supposed to have a user already at this poing
            const user = api.getState().auth.user
            // store the new token using authSlice
            api.dispatch(setCredentials({...refreshResult.data, user}))
            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        }else{
            api.dispatch(logOut())
        }
        return result
    }
} 

export const authApiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => {}
})