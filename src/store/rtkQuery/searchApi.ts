import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../models/constants";
import { SearchRequest, SearchResponse, SearchTrucksResponse } from "../../models/search/Search";

export const searchApi = createApi({
	reducerPath: "searchApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	endpoints: (build) => ({
		searchTransportations: build.query<SearchResponse, SearchRequest>({
			// query: (searchRequest) => ({
			// 	url: `Search/search?FromAddress=${searchRequest.fromAddress}&ToAddress=${searchRequest.toAddress}&LoadingDate=${encodeURIComponent(
			// 		searchRequest.loadingDate,
			// 	)}`,

			query: () => ({ url: `/search` }),
		}),
		searchTrucks: build.query<SearchTrucksResponse, SearchRequest>({
			// query: (searchRequest) => ({
			// 	url: `Search/search-trucks?FromAddress=${searchRequest.fromAddress}&ToAddress=${searchRequest.toAddress}&LoadingDate=${encodeURIComponent(
			// 		searchRequest.loadingDate,
			// 	)}`,

			query: () => ({ url: `/search-trucks` }),
		}),
	}),
});

export const { useLazySearchTransportationsQuery, useLazySearchTrucksQuery } = searchApi;
