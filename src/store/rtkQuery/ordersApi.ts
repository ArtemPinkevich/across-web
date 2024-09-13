import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_SERVER_URL, JSON_SERVER_URL, USE_FAKE_SERVER } from "../../models/constants";
import {
	BidsResponse,
	IAssignTruckRequest,
	IStartShipperApprovingRequest,
	ITransportationResult,
	OrdersInProgressResponse,
	TransportationOrderResult,
} from "../../models/orders/orderModels";
import { baseQueryWithToken } from "./baseQueryWithReauth";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: USE_FAKE_SERVER
		? fetchBaseQuery({ baseUrl: JSON_SERVER_URL })
		: baseQueryWithToken(`${BASE_SERVER_URL}/TransportationOrder`),
	tagTypes: ["OrdersInProgress"],
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getOrdersInProgress: build.query<OrdersInProgressResponse, void>({
			query: () => ({ url: `/get_orders_in_progress` }),
			providesTags: ["OrdersInProgress"],
		}),
		getBids: build.query<BidsResponse, void>({
			query: () => ({ url: `/get_bids` }),
		}),
		getOrderById: build.query<ITransportationResult, number>({
			query: (orderId) => ({
				url: `/get_order_by_id/${orderId}`,
			}),
		}),
		startShipperApproving: build.mutation<TransportationOrderResult, IStartShipperApprovingRequest>({
			query: (body) => ({
				url: "/start_shipper_approving",
				method: "POST",
				body,
			}),
			invalidatesTags: ["OrdersInProgress"],
		}),
		assignTruck: build.mutation<TransportationOrderResult, IAssignTruckRequest>({
			query: (body) => ({
				url: "/assign_truck",
				method: "POST",
				body,
			}),
			invalidatesTags: ["OrdersInProgress"],
		}),
		informArrivalForLoading: build.mutation<TransportationOrderResult, number>({
			query: (id) => ({
				url: `/inform_arrival_for_loading/${id}`,
				method: "POST",
				data: id,
			}),
			invalidatesTags: ["OrdersInProgress"],
		}),
		startTransportation: build.mutation<TransportationOrderResult, number>({
			query: (id) => ({
				url: `/start_transportation/${id}`,
				method: "POST",
				data: id,
			}),
			invalidatesTags: ["OrdersInProgress"],
		}),
		informArrivalForUnloading: build.mutation<TransportationOrderResult, number>({
			query: (id) => ({
				url: `/inform_arrival_for_unloading/${id}`,
				method: "POST",
				data: id,
			}),
			invalidatesTags: ["OrdersInProgress"],
		}),
		doneTransportation: build.mutation<TransportationOrderResult, number>({
			query: (orderId) => ({
				url: `/done_transportation/${orderId}`,
				method: "POST",
			}),
			invalidatesTags: ["OrdersInProgress"],
		}),
	}),
});

export const {
	useGetOrdersInProgressQuery,
	useGetBidsQuery,
	useGetOrderByIdQuery,
	useStartShipperApprovingMutation,
	useAssignTruckMutation,
	useInformArrivalForLoadingMutation,
	useStartTransportationMutation,
	useInformArrivalForUnloadingMutation,
	useDoneTransportationMutation,
} = ordersApi;
