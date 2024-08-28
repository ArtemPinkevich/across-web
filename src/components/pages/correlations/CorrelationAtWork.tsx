import { Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useGetOrdersInProgressQuery } from "../../../store/rtkQuery/searchApi";
import { ApiCommonResult } from "../../../models/commonApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import TransportationGeneralInfo from "../transportations/TransportationGeneralInfo";
import { orderToOrderDataItemsConverter } from "../transportations/orderToOrderDataItemsConverter";
import { useAssignTruckMutation } from "../../../store/rtkQuery/ordersApi";
import { IAssignTruckRequest, TransportationOrderResult } from "../../../models/orders/orderModels";

const errorComponent = (
	<Box m="20px">
		<Typography variant="h3" fontFamily={"monospace"}>
			Заявка не найдена
		</Typography>
	</Box>
);

const CorrelationAtWork = () => {
	let params = useParams();
	const navigate = useNavigate();
	let paramId: number | undefined = params.id ? +params.id : undefined;

	if (!paramId) {
		return errorComponent;
	}

	const { data: response } = useGetOrdersInProgressQuery();
	const [assignTruck, { isLoading, error }] = useAssignTruckMutation();

	if (!response || response.result == ApiCommonResult.Error) {
		return errorComponent;
	}

	const correlation = response.ordersInProgress.find((o) => o.transportationOrder.transportationOrderId === paramId);

	if (!correlation) {
		return errorComponent;
	}

	const dataItems = orderToOrderDataItemsConverter(
		correlation.transportationOrder.cargo,
		correlation.shipper,
		correlation.driver,
		correlation.truck,
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

	const handleOkClick = async () => {};

	return (
		<Stack m={2} spacing={3}>
			<Paper elevation={3} sx={{ p: 3 }}>
				<TransportationGeneralInfo
					transferInfo={correlation.transportationOrder.transferInfo}
					cargoName={correlation.transportationOrder.cargo.name}
					transportationStatus={correlation.transportationOrder.transportationStatus}
				/>
			</Paper>

			<DataGrid rows={dataItems} getRowId={(o) => o.parameterName!} columns={columns} density="compact" hideFooter />

			{isLoading ? (
				<Box alignSelf={"end"} justifyContent={"right"}>
					<CircularProgress />
				</Box>
			) : (
				<Stack direction={"row"} spacing={2} justifyContent={"right"}>
					<Button color="warning" variant="outlined" onClick={handleRejectClick}>
						???
					</Button>
					<Button color="success" variant="outlined" onClick={handleOkClick}>
						???
					</Button>
				</Stack>
			)}
			{error && (
				<Typography mt={1} color={"red"} alignSelf={"end"} justifyContent={"right"}>
					Не удалось выполнить операцию.
				</Typography>
			)}
		</Stack>
	);
};

export default CorrelationAtWork;
