import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useGetTruckByIdQuery } from "../../../store/rtkQuery/truckApi";
import { truckToTruckDataItemsConverter } from "./truckToTruckDataItemsConverter";
import { useSearchDriverByTruckIdQuery } from "../../../store/rtkQuery/searchApi";
import UserQuickInfo from "../counterparties/person/UserQuickInfo";

const errorComponent = (
	<Box m="20px">
		<Typography variant="h3" fontFamily={"monospace"}>
			Машина не найдена.
		</Typography>
	</Box>
);

const TruckDetails = () => {
	let params = useParams();
	let truckId: number | undefined = params.id ? +params.id : undefined;

	if (!truckId && truckId !== 0) {
		return errorComponent;
	}

	const { data: truck } = useGetTruckByIdQuery(truckId);
	const { data: driver } = useSearchDriverByTruckIdQuery(truckId);

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
			{driver && <UserQuickInfo person={driver} />}
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
