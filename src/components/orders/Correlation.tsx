import { Box, Paper, Typography } from "@mui/material";
import { useGetBidsQuery } from "../../store/rtkQuery/ordersApi";
import { ApiCommonResult } from "../../models/commonApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import CorrelationGeneralInfo from "./CorrelationGeneralInfo";
import { orderToCorrelationDataItemConverter } from "./CorrelationDataItem";
import { useGetTruckQuery } from "../../store/rtkQuery/truckApi";

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
	const { data: truck } = useGetTruckQuery();

	if (!bidsResponse || bidsResponse.result == ApiCommonResult.Error) {
		return errorComponent;
	}

	const correlation = bidsResponse.correlations.find((o) => o.transportation.transportationOrderId === paramId);

	if (!correlation) {
		return errorComponent;
	}

	const dataItems = orderToCorrelationDataItemConverter(correlation, truck);

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
		},
		{
			field: "driverParameter",
			headerName: "Перевозчик",
			width: 400,
		},
	];

	return (
		<Box m="20px">
			<Paper elevation={3} sx={{ m: 3, p: 3 }}>
				<CorrelationGeneralInfo correlation={correlation} />
			</Paper>

			<Paper elevation={3} sx={{ m: 3, p: 3 }}>
				<DataGrid
					//onRowDoubleClick={handleOnRowDoubleClick}
					rows={dataItems}
					getRowId={(o) => o.parameterName!}
					columns={columns}
					density="compact"
					hideFooter
				/>
			</Paper>
		</Box>
	);
};

export default Correlation;
