import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../models/constants";
import { BidsResponse } from "../../models/orders/orderModels";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getBids: build.query<BidsResponse, void>({
			query: () => ({ url: `/get_bids` }),
		}),
	}),
});

export const { useGetBidsQuery } = ordersApi;
