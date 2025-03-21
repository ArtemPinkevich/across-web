import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_SERVER_URL, JSON_SERVER_URL, USE_FAKE_SERVER } from "../../models/constants";
import { SearchRequest, SearchResponse, SearchTrucksResponse } from "../../models/search/Search";
import { IProfile } from "../../models/persons/personModels";
import { baseQueryWithToken } from "./baseQueryWithReauth";

export const searchApi = createApi({
	reducerPath: "searchApi",
	baseQuery: USE_FAKE_SERVER
		? fetchBaseQuery({ baseUrl: JSON_SERVER_URL })
		: baseQueryWithToken(`${BASE_SERVER_URL}/Search`),
	endpoints: (build) => ({
		searchTransportations: build.query<SearchResponse, SearchRequest>({
			query: (searchRequest) => ({
				url: `/search?FromAddress=${searchRequest.fromAddress}&ToAddress=${searchRequest.toAddress}&LoadingDate=${encodeURIComponent(
					searchRequest.loadingDate,
				)}`,
			}),
		}),
		searchTrucks: build.query<SearchTrucksResponse, SearchRequest>({
			query: (searchRequest) => ({
				url: `search_trucks?FromAddress=${searchRequest.fromAddress}&ToAddress=${searchRequest.toAddress}&LoadingDate=${encodeURIComponent(
					searchRequest.loadingDate,
				)}`,
			}),
		}),
		searchShipperByOrderId: build.query<IProfile, number>({
			query: (orderId) => ({
				url: `/search_shipper_by_order_id/${orderId}`,
			}),
		}),
		searchDriverByTruckId: build.query<IProfile, number>({
			query: (truckId) => ({
				url: `/search_driver_by_truck_id/${truckId}`,
			}),
		}),
	}),
});

export const {
	useLazySearchTransportationsQuery,
	useLazySearchTrucksQuery,
	useSearchShipperByOrderIdQuery,
	useSearchDriverByTruckIdQuery,
} = searchApi;
