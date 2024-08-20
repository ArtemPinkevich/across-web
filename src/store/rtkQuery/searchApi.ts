import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, JSON_SERVER_URL } from "../../models/constants";
import { SearchRequest, SearchResponse, SearchTrucksResponse } from "../../models/search/Search";
import { IProfile } from "../../models/persons/personModels";

// Base server
const USED_BASE_URL = BASE_URL;
const SEARCH_URL = "/Search/search";
const SEARCH_TRUCKS_URL = "/Search/search_trucks";
const SEARCH_SHIPPER_BY_ORDER_ID_URL = "/Search/search_shipper_by_order_id";
const SEARCH_DRIVER_BY_TRUCK_ID_URL = "/Search/search_driver_by_truck_id";

// json-server
// const USED_BASE_URL = JSON_SERVER_URL;
// const SEARCH_URL = "/search";
// const SEARCH_TRUCKS_URL = "/search-trucks";
//const SEARCH_SHIPPER_BY_ORDER_ID_URL = "/search_shipper_by_order_id";

export const searchApi = createApi({
	reducerPath: "searchApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${USED_BASE_URL}` }),
	endpoints: (build) => ({
		searchTransportations: build.query<SearchResponse, SearchRequest>({
			query: (searchRequest) => ({
				url: `${SEARCH_URL}?FromAddress=${searchRequest.fromAddress}&ToAddress=${searchRequest.toAddress}&LoadingDate=${encodeURIComponent(
					searchRequest.loadingDate,
				)}`,
			}),
		}),
		searchTrucks: build.query<SearchTrucksResponse, SearchRequest>({
			query: (searchRequest) => ({
				url: `${SEARCH_TRUCKS_URL}?FromAddress=${searchRequest.fromAddress}&ToAddress=${searchRequest.toAddress}&LoadingDate=${encodeURIComponent(
					searchRequest.loadingDate,
				)}`,
			}),
		}),
		searchShipperByOrderId: build.query<IProfile, number>({
			query: (orderId) => ({
				url: `${SEARCH_SHIPPER_BY_ORDER_ID_URL}/${orderId}`,
			}),
		}),
		searchDriverByTruckId: build.query<IProfile, number>({
			query: (truckId) => ({
				url: `${SEARCH_DRIVER_BY_TRUCK_ID_URL}/${truckId}`,
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
