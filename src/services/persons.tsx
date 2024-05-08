import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PersonProps } from "../components/reports/Person";

const baseUrl = "http://localhost:3001/persons";

export const personApi = createApi({
  reducerPath: "persons",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
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

export const { useGetPersonsQuery } = personApi;
