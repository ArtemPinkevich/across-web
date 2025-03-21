import { Box, Typography } from "@mui/material";
import { ApiCommonResult } from "../../models/commonApi";
import CorrelationsTable from "./correlations/CorrelationsTable";
import { useGetBidsQuery } from "../../store/rtkQuery/ordersApi";

const MatchesTab = () => {
	const { data: bidsResponse } = useGetBidsQuery();

	if (!bidsResponse || bidsResponse.result == ApiCommonResult.Error) {
		return (
			<Box m="20px">
				<Typography>Подборок не найдено</Typography>
			</Box>
		);
	}

	const correlations = bidsResponse.correlations.filter(
		(o) => o.transportationOrder.transportationOrderId !== undefined,
	);

	return (
		<Box m="20px">
			{correlations?.length > 0 ? null : ( // <CorrelationsTable correlations={correlations} />
				<Typography>Подходящих перевозок не найдено</Typography>
			)}
		</Box>
	);
};

export default MatchesTab;
