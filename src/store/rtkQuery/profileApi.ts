import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, JSON_SERVER_URL } from "../../models/constants";
import { IChangeDocumentStatusRequest, IProfile } from "../../models/persons/personModels";
import { DefaultResponse } from "../../models/commonApi";

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

		// getShipper: build.query<IProfile, number>({
		// 	query: (transportationId) => ({ url: `/get_profile/${transportationId}`, data: transportationId }),
		// }),
		getShipper: build.query<IProfile, number>({
			query: (transportationId) => ({ url: `/get_profile` }),
		}),

		// getDriver: build.query<IProfile, number>({
		// 	query: (truckId) => ({ url: `/get_profile/${truckId}`, data: truckId }),
		// }),
		getDriver: build.query<IProfile, number>({
			query: (truckId) => ({ url: `/get_profile` }),
		}),
	}),
});

export const { useGetProfileQuery, useGetShipperQuery, useGetDriverQuery } = profileApi;
