import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_SERVER_URL, JSON_SERVER_URL, USE_FAKE_SERVER } from "../../models/constants";
import { IProfile } from "../../models/persons/personModels";
import { baseQueryWithToken } from "./baseQueryWithReauth";

export const profileApi = createApi({
	reducerPath: "profileApi",
	tagTypes: ["Profile"],
	baseQuery: USE_FAKE_SERVER
		? fetchBaseQuery({ baseUrl: JSON_SERVER_URL })
		: baseQueryWithToken(`${BASE_SERVER_URL}/Profiles`),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getProfile: build.query<IProfile, void>({
			query: () => ({ url: "/get_profile" }),
			providesTags: ["Profile"],
		}),
	}),
});

export const { useGetProfileQuery } = profileApi;
