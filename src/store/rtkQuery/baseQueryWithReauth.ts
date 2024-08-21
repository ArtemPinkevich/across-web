import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { getFromLocalStorage, LocalStorageKeys } from "../../services/LocalStorageService";

// Сделано на базе https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
export const baseQueryWithToken =
	(baseUrl: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
	async (args, api, extraOptions) => {
		const token = await getFromLocalStorage(LocalStorageKeys.accessToken);
		const baseQuery = fetchBaseQuery({ baseUrl: baseUrl, headers: { Authorization: `Bearer ${token}` } });
		let result = await baseQuery(args, api, extraOptions);
		return result;
	};
