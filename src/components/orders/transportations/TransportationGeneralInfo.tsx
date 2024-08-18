import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { placeToDisplayStringConverter } from "../../../models/places/PlaceToDisplayStringConverter";
import { ITransferInfo } from "../../../models/orders/orderModels";
import { TransportationStatus } from "../../../models/orders/TransportationStatus";
import { TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP } from "../../../models/orders/TransportationStatusToDisplayNameMap";
import moment from "moment";

export type Props = {
	transferInfo: ITransferInfo;
	cargoName: string;
	transportationStatus: TransportationStatus;
};

const TransportationGeneralInfo = (props: Props) => {
	let { transferInfo, cargoName, transportationStatus } = props;

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
		{
			id: 2,
			parameterName: "Город загрузки",
			parameterValue: placeToDisplayStringConverter(transferInfo.loadingPlace),
		},
		{ id: 3, parameterName: "Адрес загрузки", parameterValue: transferInfo.loadingAddress },
		{
			id: 4,
			parameterName: "Дата загрузки",
			parameterValue: displyLoadingDate,
		},
		{
			id: 5,
			parameterName: "Город выгрузки",
			parameterValue: placeToDisplayStringConverter(transferInfo.unloadingPlace),
		},
		{ id: 6, parameterName: "Адрес выгрузки", parameterValue: transferInfo.unloadingAddress },
		{
			id: 7,
			parameterName: "Статус груза",
			parameterValue: TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP.get(transportationStatus)?.toUpperCase(),
		},
	];

	return <DataGrid rows={rows} columns={columns} density="compact" hideFooter columnHeaderHeight={0} />;
};

export default TransportationGeneralInfo;
