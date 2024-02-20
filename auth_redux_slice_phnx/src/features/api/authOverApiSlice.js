import { apiSlice } from "./apiSlice";
import { authApiSlice } from "./authApiSlice";

const LOGIN_ENDPOINT = '/login'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        userPassLogin: builder.mutation({
            query: credentials => ({
                url: LOGIN_ENDPOINT,
                method: 'POST',
                body: { ...credentials }
            })
        })
    })

})