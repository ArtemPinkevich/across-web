import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { placeToDisplayStringConverter } from "../../models/places/PlaceToDisplayStringConverter";
import { ICorrelation } from "../../models/orders/orderModels";

export type Props = {
	correlation: ICorrelation;
};

const CorrelationGeneralInfo = (props: Props) => {
	let { correlation } = props;
	const transferInfo = correlation.transportation.transferInfo;

	const columns: GridColDef<(typeof rows)[number]>[] = [
		{
			field: "parameterName",
			headerName: "Параметр",
			width: 150,
			align: "right",
			headerAlign: "center",
		},
		{
			field: "parameterValue",
			headerName: "Значение",
			width: 200,
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
		{ id: 1, parameterName: "Название", parameterValue: correlation.transportation.cargo.name },
		{
			id: 2,
			parameterName: "Город загрузки",
			parameterValue: placeToDisplayStringConverter(transferInfo.loadingPlace),
		},
		{ id: 3, parameterName: "Адрес загрузки", parameterValue: transferInfo.loadingAddress },
		{ id: 4, parameterName: "Дата загрузки", parameterValue: transferInfo.loadingDateFrom },
		{
			id: 5,
			parameterName: "Город выгрузки",
			parameterValue: placeToDisplayStringConverter(transferInfo.unloadingPlace),
		},
		{ id: 6, parameterName: "Адрес выгрузки", parameterValue: transferInfo.unloadingAddress },
	];

	return <DataGrid rows={rows} columns={columns} density="compact" hideFooter columnHeaderHeight={0} />;
};

export default CorrelationGeneralInfo;
