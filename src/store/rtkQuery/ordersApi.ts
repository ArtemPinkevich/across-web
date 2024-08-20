import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../models/constants";
import { BidsResponse, ITransportationResult } from "../../models/orders/orderModels";

// Base server
const USED_BASE_URL = BASE_URL;
const GET_ORDER_BY_ID_URL = "/TransportationOrder/get_order_by_id";

// json-server
// const USED_BASE_URL = JSON_SERVER_URL;
//const GET_ORDER_BY_ID_URL = "/get_order_by_id";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: fetchBaseQuery({ baseUrl: USED_BASE_URL }),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getBids: build.query<BidsResponse, void>({
			query: () => ({ url: `/get_bids` }),
		}),
		getOrderById: build.query<ITransportationResult, number>({
			query: (orderId) => ({
				url: `${GET_ORDER_BY_ID_URL}/${orderId}`,
			}),
		}),
	}),
});

export const { useGetBidsQuery, useGetOrderByIdQuery } = ordersApi;
