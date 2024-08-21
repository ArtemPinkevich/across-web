import { Box, Typography } from "@mui/material";
import { ApiCommonResult } from "../../models/commonApi";
import CorrelationsTable from "./correlations/CorrelationsTable";
import { useGetBidsQuery } from "../../store/rtkQuery/searchApi";

const AtWorkTab = () => {
	const { data: bidsResponse } = useGetBidsQuery();

	if (!bidsResponse || bidsResponse.result == ApiCommonResult.Error) {
		return (
			<Box m="20px">
				<Typography>Активных перевозок не найдено</Typography>
			</Box>
		);
	}

	const correlations = bidsResponse.correlations.filter((o) => o.transportation.transportationOrderId !== undefined);

	return (
		<Box m="20px">
			{correlations?.length > 0 ? (
				<CorrelationsTable correlations={correlations} />
			) : (
				<Typography>Активных перевозок не найдено</Typography>
			)}
		</Box>
	);
};

export default AtWorkTab;
