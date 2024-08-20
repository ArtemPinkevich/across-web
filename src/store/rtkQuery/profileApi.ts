import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, JSON_SERVER_URL } from "../../models/constants";
import { IProfile } from "../../models/persons/personModels";

// Base server
// const USED_BASE_URL = BASE_URL
// const GET_PROFILE_URL = "/Profiles/get_profile";

// json-server
const USED_BASE_URL = JSON_SERVER_URL;
const GET_PROFILE_URL = "/get_profile";

export const profileApi = createApi({
	reducerPath: "profileApi",
	tagTypes: ["Profile"],
	baseQuery: fetchBaseQuery({ baseUrl: `${USED_BASE_URL}` }),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getProfile: build.query<IProfile, void>({
			query: () => ({ url: GET_PROFILE_URL }),
			providesTags: ["Profile"],
		}),
	}),
});

export const { useGetProfileQuery } = profileApi;
