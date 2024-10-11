import apiSlice from "../../app/api/apiSlice";
import { setLogout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(setLogout())
                    setTimeout(() => {
                        dispatch(authApiSlice.util.resetApiState())
                    }, 500)
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const { useLoginMutation, useLogoutMutation } = authApiSlice
