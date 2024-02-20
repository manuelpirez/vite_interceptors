import { createSlice } from "@reduxjs/toolkit"


// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload
            state.user = user
            state.accessToken = accessToken
            state.refreshToken = refreshToken
        },
        logOut: (state, action) => {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
        }
    }
})

// Actions
export const {setCredentials, logOut} = authSlice.actions

// Reducer
export default authSlice.reducer

// Selectors
export const selectCurrentUser = state => state.auth.user
export const selectAccessToken = state => state.auth.accessToken
export const selectRefreshToken = state => state.auth.refreshToken