import { baseProtectedApi } from "./index";

const profileApi = baseProtectedApi.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query({
      query: () => "/v1/users/me/",
    }),
    updateEmailAddress: build.mutation({
      query: (email) => ({
        url: "/v1/users/update-email/",
        method: "PUT",
        body: email,
      }),
    }),
    confirmUserEmailAddress: build.mutation({
      query: (confirmationEmailData) => ({
        url: `/v1/users/email-confirmation/${confirmationEmailData.token}/`,
        method: "PUT",
        body: confirmationEmailData.email,
      }),
    }),
    updatePassword: build.mutation({
      query: (passwords) => ({
        url: "/v1/users/update-password/",
        method: "PUT",
        body: passwords,
      }),
    }),
    updateUserProfile: build.mutation({
      query: (userProfile) => ({
        url: "/v1/profile/",
        method: "PUT",
        body: userProfile,
      }),
    }),
    updateUserPhoto: build.mutation({
      query: (userProfilePhoto) => ({
        url: "/v1/profile/update-photo/",
        method: "PUT",
        body: userProfilePhoto,
      }),
    }),
  }),
});

export const {
  useUserProfileQuery,
  useUpdateEmailAddressMutation,
  useConfirmUserEmailAddressMutation,
  useUpdatePasswordMutation,
  useUpdateUserProfileMutation,
  useUpdateUserPhotoMutation,
} = profileApi;
