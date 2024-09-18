import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { placeToDisplayStringConverter } from "../../../models/places/PlaceToDisplayStringConverter";
import { ITransportation } from "../../../models/orders/orderModels";
import { TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP } from "../../../models/orders/TransportationStatusToDisplayNameMap";
import moment from "moment";

export type Props = {
	transportation: ITransportation;
};

const TransportationGeneralInfo = (props: Props) => {
	let { transportation } = props;

	if (!transportation) {
		return null;
	}

	const transferInfo = transportation.transferInfo;
	const cargoName = transportation.cargo.name;
	const transportationStatus = transportation.transportationOrderStatus;

	let displyLoadingDate = transferInfo.loadingDateFrom
		? moment(transferInfo.loadingDateFrom).format("DD.MM.YYYY")
		: moment().format("DD.MM.YYYY");

	if (transferInfo.loadingDateTo) {
		displyLoadingDate += ` - ${moment(transferInfo.loadingDateTo).format("DD.MM.YYYY")}`;
	}

	const columns: GridColDef<(typeof rows)[number]>[] = [
		{
			field: "parameterName",
			headerName: "",
			width: 150,
			align: "right",
			headerAlign: "center",
		},
		{
			field: "parameterValue",
			flex: 1,
			headerName: "",
			headerAlign: "center",
			renderCell: (params) => {
				return (
					<Box alignContent={"center"} height={"100%"}>
						<Typography variant="body1">{params.value}</Typography>
					</Box>
				);
			},
		},
	];

	const rows = [
		{ id: 1, parameterName: "Название", parameterValue: cargoName },
		{ id: 2, parameterName: "Ставка", parameterValue: `${transportation.price}, ₸` },
		{
			id: 3,
			parameterName: "Город загрузки",
			parameterValue: placeToDisplayStringConverter(transferInfo.loadingPlace),
		},
		{ id: 4, parameterName: "Адрес загрузки", parameterValue: transferInfo.loadingAddress },
		{
			id: 5,
			parameterName: "Дата загрузки",
			parameterValue: displyLoadingDate,
		},
		{
			id: 6,
			parameterName: "Город выгрузки",
			parameterValue: placeToDisplayStringConverter(transferInfo.unloadingPlace),
		},
		{ id: 7, parameterName: "Адрес выгрузки", parameterValue: transferInfo.unloadingAddress },
		{
			id: 8,
			parameterName: "Статус груза",
			parameterValue: TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP.get(transportationStatus)?.toUpperCase(),
		},
	];

	return <DataGrid rows={rows} columns={columns} density="compact" hideFooter columnHeaderHeight={0} />;
};

export default TransportationGeneralInfo;
