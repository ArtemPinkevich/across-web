import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, JSON_SERVER_URL } from "../../models/constants";
import { SearchRequest, SearchResponse, SearchTrucksResponse } from "../../models/search/Search";

// Base server
const USED_BASE_URL = BASE_URL;
const SEARCH_URL = "/Search/search";
const SEARCH_TRUCKS_URL = "/Search/search_trucks";

// json-server
// const USED_BASE_URL = JSON_SERVER_URL;
// const SEARCH_URL = "/search";
// const SEARCH_TRUCKS_URL = "/search-trucks";

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
	}),
});

export const { useLazySearchTransportationsQuery, useLazySearchTrucksQuery } = searchApi;
