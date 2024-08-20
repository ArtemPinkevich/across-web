import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useGetBidsQuery } from "../../../store/rtkQuery/ordersApi";
import { ApiCommonResult } from "../../../models/commonApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import TransportationGeneralInfo from "../transportations/TransportationGeneralInfo";
import { orderToOrderDataItemsConverter } from "../transportations/orderToOrderDataItemsConverter";

const errorComponent = (
	<Box m="20px">
		<Typography variant="h3" fontFamily={"monospace"}>
			Заявка не найдена
		</Typography>
	</Box>
);

const Correlation = () => {
	let params = useParams();
	let paramId: number | undefined = params.id ? +params.id : undefined;

	if (!paramId) {
		return errorComponent;
	}

	const { data: bidsResponse } = useGetBidsQuery();
	//const { data: truck } = useGetTruckQuery();

	if (!bidsResponse || bidsResponse.result == ApiCommonResult.Error) {
		return errorComponent;
	}

	const correlation = bidsResponse.correlations.find((o) => o.transportation.transportationOrderId === paramId);

	if (!correlation) {
		return errorComponent;
	}

	const dataItems = orderToOrderDataItemsConverter(
		correlation.transportation.cargo,
		correlation.shipper,
		correlation.driver,
		truck,
	);

	const columns: GridColDef<(typeof dataItems)[number]>[] = [
		{
			field: "parameterName",
			headerName: "",
			sortable: true,
			width: 250,
		},
		{
			field: "shipperParameter",
			headerName: "Отправитель",
			width: 400,
			flex: 1,
		},
		{
			field: "driverParameter",
			headerName: "Перевозчик",
			width: 400,
			flex: 1,
		},
	];

	const handleRejectClick = () => {};

	const handleOkClick = () => {};

	return (
		<Stack m={2} spacing={3}>
			<Paper elevation={3} sx={{ p: 3 }}>
				<TransportationGeneralInfo
					transferInfo={correlation.transportation.transferInfo}
					cargoName={correlation.transportation.cargo.name}
					transportationStatus={correlation.transportation.transportationStatus}
				/>
			</Paper>

			<DataGrid rows={dataItems} getRowId={(o) => o.parameterName!} columns={columns} density="compact" hideFooter />

			<Stack direction={"row"} spacing={2} justifyContent={"right"}>
				<Button color="warning" variant="outlined" onClick={handleRejectClick}>
					Отклонить
				</Button>
				<Button color="success" variant="outlined" onClick={handleRejectClick}>
					Закрепить груз за водителем
				</Button>
			</Stack>
		</Stack>
	);
};

export default Correlation;
