import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../models/constants";
import { BidsResponse, ITransportation } from "../../models/orders/orderModels";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getBids: build.query<BidsResponse, void>({
			query: () => ({ url: `/get_bids` }),
		}),
		// getOrder: build.query<ITransportation, number>({
		// 	query: (id) => ({ url: `/get_order/${id}`, data: id }),
		// }),
		getOrder: build.query<ITransportation, number>({
			query: (id) => ({ url: `/get_order` }),
		}),
	}),
});

export const { useGetBidsQuery, useGetOrderQuery } = ordersApi;
