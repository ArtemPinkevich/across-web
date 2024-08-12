import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../models/constants";
import { ITruck } from "../../models/truck/truck";

export const truckApi = createApi({
	reducerPath: "truckApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: (build) => ({
		getTruck: build.query<ITruck, void>({
			query: () => ({ url: `/get_truck` }),
		}),
	}),
});

export const { useGetTruckQuery } = truckApi;
