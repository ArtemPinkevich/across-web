import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_SERVER_URL, JSON_SERVER_URL, USE_FAKE_SERVER } from "../../models/constants";
import { IChangeDocumentStatusRequest, IChangePersonStatusRequest, IProfile } from "../../models/persons/personModels";
import { DefaultResponse } from "../../models/commonApi";
import { baseQueryWithToken } from "./baseQueryWithReauth";

export const personApi = createApi({
	reducerPath: "persons",
	baseQuery: USE_FAKE_SERVER
		? fetchBaseQuery({ baseUrl: JSON_SERVER_URL })
		: baseQueryWithToken(`${BASE_SERVER_URL}/Profiles`),
	tagTypes: ["Persons"],
	// refetchOnFocus: true,
	// refetchOnReconnect: true,
	endpoints: (builder) => ({
		getPersons: builder.query<IProfile[], void>({
			query: () => ({ url: "/get_shippers_and_drivers" }),
			providesTags: ["Persons"],
		}),
		changeDocStatus: builder.mutation<DefaultResponse, IChangeDocumentStatusRequest>({
			query: (body) => ({
				url: "/change_doc_status",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Persons"],
		}),
		changePersonStatus: builder.mutation<DefaultResponse, IChangePersonStatusRequest>({
			query: (body) => ({
				url: "/change_person_status",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Persons"],
		}),
	}),
});

export const { useGetPersonsQuery, useLazyGetPersonsQuery, useChangeDocStatusMutation, useChangePersonStatusMutation } =
	personApi;
