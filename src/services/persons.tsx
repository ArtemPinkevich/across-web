import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PersonProps } from "../components/person/Person";
import { BASE_URL } from "../models/constants";

export const personApi = createApi({
	reducerPath: "persons",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/persons` }),
	tagTypes: ["Persons"],
	refetchOnFocus: true,
	refetchOnReconnect: true,
	endpoints: (builder) => ({
		getPersons: builder.query<PersonProps[], void>({
			query: () => "",
			providesTags: ["Persons"],
		}),
	}),
});

export const { useGetPersonsQuery, useLazyGetPersonsQuery } = personApi;
