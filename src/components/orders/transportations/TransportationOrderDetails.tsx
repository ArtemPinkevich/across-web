import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../../store/rtkQuery/ordersApi";
import { orderToOrderDataItemsConverter } from "./orderToOrderDataItemsConverter";
import { useGetShipperQuery } from "../../../store/rtkQuery/profileApi";
import TransportationGeneralInfo from "./TransportationGeneralInfo";

const errorComponent = (
	<Box m="20px">
		<Typography variant="h3" fontFamily={"monospace"}>
			Груз не найден.
		</Typography>
	</Box>
);

const TransportationOrderDetails = () => {
	let params = useParams();
	let paramId: number | undefined = params.id ? +params.id : undefined;

	if (!paramId && paramId !== 0) {
		return errorComponent;
	}

	const { data: order } = useGetOrderQuery(paramId);
	const { data: shipper } = useGetShipperQuery(paramId);

	if (!order) {
		return errorComponent;
	}

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
			<TransportationGeneralInfo
				transferInfo={order.transferInfo}
				cargoName={order.cargo.name}
				transportationStatus={order.transportationStatus}
			/>
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
