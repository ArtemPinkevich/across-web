import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../models/constants";
import { ITruck } from "../../models/truck/truck";

// Base server
const USED_BASE_URL = BASE_URL;
const GET_TRUCK_BY_ID_URL = "/Truck/get_truck_by_id";

// json-server
// const USED_BASE_URL = JSON_SERVER_URL;
//const GET_TRUCK_BY_ID_URL = "/get_truck_by_id";

export const truckApi = createApi({
	reducerPath: "truckApi",
	baseQuery: fetchBaseQuery({ baseUrl: USED_BASE_URL }),
	endpoints: (build) => ({
		getTruckById: build.query<ITruck, number>({
			query: (truckId) => ({
				url: `${GET_TRUCK_BY_ID_URL}/${truckId}`,
			}),
		}),
	}),
});

export const { useGetTruckByIdQuery } = truckApi;
