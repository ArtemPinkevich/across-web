import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../models/constants";
import { IProfile } from "../../models/persons/personModels";

export const profileApi = createApi({
	reducerPath: "profileApi",
	tagTypes: ["Profile"],
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getProfile: build.query<IProfile, void>({
			query: () => ({ url: `/get_profile` }),
			providesTags: ["Profile"],
		}),
	}),
});

export const { useGetProfileQuery } = profileApi;
