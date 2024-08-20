import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, JSON_SERVER_URL } from "../../models/constants";
import { IChangeDocumentStatusRequest, IChangePersonStatusRequest, IProfile } from "../../models/persons/personModels";
import { DefaultResponse } from "../../models/commonApi";

// Base server
const USED_BASE_URL = BASE_URL;
const GET_PERSONS_URL = "/Profiles/get_shippers_and_drivers";
const CHANGE_DOC_STATUS_URL = "/Profiles/change_doc_status";
const CHANGE_PERSON_STATUS_URL = "/Profiles/change_person_status";

// json-server
// const USED_BASE_URL = JSON_SERVER_URL;
// const GET_PERSONS_URL = "/get_shippers_and_drivers";

export const personApi = createApi({
	reducerPath: "persons",
	baseQuery: fetchBaseQuery({ baseUrl: USED_BASE_URL }),
	tagTypes: ["Persons"],
	// refetchOnFocus: true,
	// refetchOnReconnect: true,
	endpoints: (builder) => ({
		getPersons: builder.query<IProfile[], void>({
			query: () => ({ url: GET_PERSONS_URL }),
			providesTags: ["Persons"],
		}),
		changeDocStatus: builder.mutation<DefaultResponse, IChangeDocumentStatusRequest>({
			query: (body) => ({
				url: CHANGE_DOC_STATUS_URL,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Persons"],
		}),
		changePersonStatus: builder.mutation<DefaultResponse, IChangePersonStatusRequest>({
			query: (body) => ({
				url: CHANGE_PERSON_STATUS_URL,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Persons"],
		}),
	}),
});

export const { useGetPersonsQuery, useLazyGetPersonsQuery, useChangeDocStatusMutation, useChangePersonStatusMutation } =
	personApi;
