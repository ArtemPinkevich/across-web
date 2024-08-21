import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_SERVER_URL, JSON_SERVER_URL, USE_FAKE_SERVER } from "../../models/constants";
import { ITruck } from "../../models/truck/truck";
import { baseQueryWithToken } from "./baseQueryWithReauth";

export const truckApi = createApi({
	reducerPath: "truckApi",
	baseQuery: USE_FAKE_SERVER
		? fetchBaseQuery({ baseUrl: JSON_SERVER_URL })
		: baseQueryWithToken(`${BASE_SERVER_URL}/Truck`),
	endpoints: (build) => ({
		getTruckById: build.query<ITruck, number>({
			query: (truckId) => ({
				url: `/get_truck_by_id/${truckId}`,
			}),
		}),
	}),
});

export const { useGetTruckByIdQuery } = truckApi;
