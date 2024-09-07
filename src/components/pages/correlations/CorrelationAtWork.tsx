import { Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useGetOrdersInProgressQuery } from "../../../store/rtkQuery/searchApi";
import { ApiCommonResult } from "../../../models/commonApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import TransportationGeneralInfo from "../transportations/TransportationGeneralInfo";
import { orderToOrderDataItemsConverter } from "../transportations/orderToOrderDataItemsConverter";
import {
	useAssignTruckMutation,
	useDoneTransportationMutation,
	useInformArrivalForLoadingMutation,
	useInformArrivalForUnloadingMutation,
	useStartTransportationMutation,
} from "../../../store/rtkQuery/ordersApi";
import { IAssignTruckRequest, TransportationOrderResult } from "../../../models/orders/orderModels";
import { TransportationStatus } from "../../../models/orders/TransportationStatus";

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
	const [doneTransportation, { isLoading, error }] = useDoneTransportationMutation();

	const [assignTruck, { isLoading: isLoadingAssignTruck, error: errorAassignTruck }] = useAssignTruckMutation();
	const [informArrivalForLoading, { isLoading: isLoadingForLoading, error: errorForLoading }] =
		useInformArrivalForLoadingMutation();
	const [startTransportation, { isLoading: isLoadingStartTransportation, error: errorStartTransportation }] =
		useStartTransportationMutation();
	const [informArrivalForUnloading, { isLoading: isLoadingForUnloading, error: errorForUnloading }] =
		useInformArrivalForUnloadingMutation();

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

	const handleOkClick = async () => {
		const currentStatus = correlation.transportationOrder?.transportationOrderStatus;
		const orderId = correlation.transportationOrder?.transportationOrderId;
		if (!currentStatus || !orderId) {
			return;
		}

		let responce: TransportationOrderResult | undefined = undefined;

		if (currentStatus === TransportationStatus.shipperApproving) {
			if (correlation?.truck?.truckId === undefined) {
				return;
			}
			const assignTruckRequest: IAssignTruckRequest = {
				truckId: correlation.truck.truckId,
				transportationOrderId: orderId,
			};
			responce = await assignTruck(assignTruckRequest).unwrap();
		} else if (currentStatus === TransportationStatus.waitingForLoading) {
			responce = await informArrivalForLoading(orderId).unwrap();
		} else if (currentStatus === TransportationStatus.loading) {
			responce = await startTransportation(orderId).unwrap();
		} else if (currentStatus === TransportationStatus.transporting) {
			responce = await informArrivalForUnloading(orderId).unwrap();
		} else if (currentStatus === TransportationStatus.unloading) {
			responce = await doneTransportation(orderId).unwrap();
		}

		if (responce?.result === ApiCommonResult.Ok) {
			navigate("/");
		}
	};

	const getButtonText = () => {
		const currentStatus = correlation.transportationOrder?.transportationOrderStatus;
		if (!currentStatus) {
			return "";
		}

		switch (currentStatus) {
			case TransportationStatus.shipperApproving:
				return "Закрепить груз за водителем";
			case TransportationStatus.waitingForLoading:
				return "Прибыл для загрузки";
			case TransportationStatus.loading:
				return "В путь";
			case TransportationStatus.transporting:
				return "Прибыл для выгрузки";
			case TransportationStatus.unloading:
			case TransportationStatus.delivered:
				return "Завершить перевозку";
			default:
				return "OK";
		}
	};

	return (
		<Stack m={2} spacing={3}>
			<Paper elevation={3} sx={{ p: 3 }}>
				<TransportationGeneralInfo
					transferInfo={correlation.transportationOrder.transferInfo}
					cargoName={correlation.transportationOrder.cargo.name}
					transportationStatus={correlation.transportationOrder.transportationOrderStatus}
				/>
			</Paper>

			<DataGrid rows={dataItems} getRowId={(o) => o.parameterName!} columns={columns} density="compact" hideFooter />

			{isLoading ||
			isLoadingAssignTruck ||
			isLoadingForLoading ||
			isLoadingStartTransportation ||
			isLoadingForUnloading ? (
				<Box alignSelf={"end"} justifyContent={"right"}>
					<CircularProgress />
				</Box>
			) : (
				<Stack direction={"row"} spacing={2} justifyContent={"right"}>
					{correlation.transportationOrder.transportationOrderStatus === TransportationStatus.shipperApproving && (
						<Button color="warning" variant="outlined" onClick={handleRejectClick}>
							Отменить согласование
						</Button>
					)}
					<Button color="success" variant="outlined" onClick={handleOkClick}>
						{getButtonText()}
					</Button>
				</Stack>
			)}
			{(error || errorAassignTruck || errorForLoading || errorStartTransportation || errorForUnloading) && (
				<Typography mt={1} color={"red"} alignSelf={"end"} justifyContent={"right"}>
					Не удалось выполнить операцию.
				</Typography>
			)}
		</Stack>
	);
};

export default CorrelationAtWork;
