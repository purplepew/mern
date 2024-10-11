import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error.status === 401) {
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error) {
                refreshResult.error.message = "refresh token has expired"
            }
            return refreshResult
        }
    }
    return result
}

const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
})

export default apiSlice