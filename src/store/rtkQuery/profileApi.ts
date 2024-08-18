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
