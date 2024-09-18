import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../store/rtkQuery/ordersApi";
import { orderToOrderDataItemsConverter } from "./orderToOrderDataItemsConverter";
import TransportationGeneralInfo from "./TransportationGeneralInfo";
import { ITransportation } from "../../../models/orders/orderModels";
import { useSearchShipperByOrderIdQuery } from "../../../store/rtkQuery/searchApi";

const errorComponent = (
	<Box m="20px">
		<Typography variant="h3" fontFamily={"monospace"}>
			Груз не найден.
		</Typography>
	</Box>
);

const TransportationOrderDetails = () => {
	let params = useParams();
	let orderId: number | undefined = params.id ? +params.id : undefined;

	if (!orderId && orderId !== 0) {
		return errorComponent;
	}

	const { data: orderResponce } = useGetOrderByIdQuery(orderId);
	const { data: shipper } = useSearchShipperByOrderIdQuery(orderId);

	if (!orderResponce || orderResponce.transportationOrderDtos?.length <= 0) {
		return errorComponent;
	}

	const order: ITransportation = orderResponce.transportationOrderDtos[0];

	const dataItems = orderToOrderDataItemsConverter(order.cargo, shipper);

	const columns: GridColDef<(typeof dataItems)[number]>[] = [
		{
			field: "parameterName",
			headerName: "",
			sortable: true,
			width: 250,
		},
		{
			field: "shipperParameter",
			headerName: "",
			width: 400,
			flex: 1,
		},
	];

	return (
		<Stack m={5} spacing={2} letterSpacing={0.3}>
			<TransportationGeneralInfo transportation={order} />
			<DataGrid
				rows={dataItems}
				getRowId={(o) => o.parameterName!}
				columns={columns}
				density="compact"
				hideFooter
				columnHeaderHeight={0}
			/>
		</Stack>
	);
};

export default TransportationOrderDetails;
