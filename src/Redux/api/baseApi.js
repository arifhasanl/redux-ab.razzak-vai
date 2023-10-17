
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi=createApi({
reducerPath:"api",
baseQuery:fetchBaseQuery({baseUrl:'https://60f2479f6d44f300177885e6.mockapi.io'}),
tagTypes:['tasks'],
endpoints:(builder)=>({
    getUser:builder.query({
        query:({type,page,limit})=>`/users?user_type=${type}?&page=${page}&limit=${limit}`,
        providesTags:['tasks']
    }),
    
    postUser:builder.mutation({
        query:({data})=>({
            url:'/users',
            method:'POST',
            body:data,
            
        }),
        invalidatesTags:['tasks']
    }),
    upDateUser:builder.mutation({
        query:({id,data})=>({
           
                url:`/users/${id}`,
                method:'PUT',
                body:data
            
        }),
        invalidatesTags:['tasks']
    }),
    deleteUser:builder.mutation({
        query:(id)=>({
            url:`/users/${id}`,
            method:'DELETE'
        }),
        invalidatesTags:['tasks']
    }),
    getSingleUser:builder.query({
        query:(id)=>`/users/${id}`
    })
}),

})
export const {useGetUserQuery,usePostUserMutation,useUpDateUserMutation,useDeleteUserMutation,useGetSingleUserQuery}=baseApi
export default baseApi