import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_SERVER_URL, JSON_SERVER_URL, USE_FAKE_SERVER } from "../../models/constants";
import { ITransportationResult } from "../../models/orders/orderModels";
import { baseQueryWithToken } from "./baseQueryWithReauth";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: USE_FAKE_SERVER
		? fetchBaseQuery({ baseUrl: JSON_SERVER_URL })
		: baseQueryWithToken(`${BASE_SERVER_URL}/TransportationOrder`),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getOrderById: build.query<ITransportationResult, number>({
			query: (orderId) => ({
				url: `/get_order_by_id/${orderId}`,
			}),
		}),
	}),
});

export const { useGetOrderByIdQuery } = ordersApi;
