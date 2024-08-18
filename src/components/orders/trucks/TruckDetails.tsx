import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useGetDriverQuery } from "../../../store/rtkQuery/profileApi";
import { useGetTruckQuery } from "../../../store/rtkQuery/truckApi";
import { truckToTruckDataItemsConverter } from "./truckToTruckDataItemsConverter";

const errorComponent = (
	<Box m="20px">
		<Typography variant="h3" fontFamily={"monospace"}>
			Машина не найдена.
		</Typography>
	</Box>
);

const TruckDetails = () => {
	let params = useParams();
	let paramId: number | undefined = params.id ? +params.id : undefined;

	if (!paramId && paramId !== 0) {
		return errorComponent;
	}

	const { data: truck } = useGetTruckQuery();
	const { data: driver } = useGetDriverQuery(paramId);

	if (!truck) {
		return errorComponent;
	}

	const dataItems = truckToTruckDataItemsConverter(truck, driver);

	const columns: GridColDef<(typeof dataItems)[number]>[] = [
		{
			field: "parameterName",
			headerName: "",
			sortable: true,
			width: 250,
		},
		{
			field: "value",
			headerName: "",
			width: 400,
			flex: 1,
		},
	];

	return (
		<Stack m={5} spacing={2} letterSpacing={0.3}>
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

export default TruckDetails;
