import { apiSlice } from "../apiSlice"; 

const ADMIN_URL  = '/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        body: data,
         credentials: 'include'
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: 'POST',
      }),
    }),
    getUsers : builder.mutation({
      query : (data) => ({
          url : `${ADMIN_URL}/users`,
          method : 'GET'
      })
  }),
  addNewUser : builder.mutation({
    query : (data) => ({
        url : `${ADMIN_URL}/users`,
        method : 'POST',
        body : data
    })
}),
  updateUserDetails: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/users`,
      method: "PUT",
      body: data,
    }),
  }),

deleteUser: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/users`,
      method: "DELETE",
      body: data,
    }),
  }),
  }),
});

export const {
   useLoginMutation,
  useLogoutMutation,
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
  useGetUsersMutation,
  useAddNewUserMutation,


 } = adminApiSlice


 