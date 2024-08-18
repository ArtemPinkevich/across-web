import { Box, Typography } from "@mui/material";
import { useGetBidsQuery } from "../../store/rtkQuery/ordersApi";
import { ApiCommonResult } from "../../models/commonApi";
import CorrelationsTable from "./correlations/CorrelationsTable";

const MatchesTab = () => {
	const { data: bidsResponse } = useGetBidsQuery();

	if (!bidsResponse || bidsResponse.result == ApiCommonResult.Error) {
		return <Box />;
	}

	const correlations = bidsResponse.correlations.filter((o) => o.transportation.transportationOrderId !== undefined);

	return (
		<Box m="20px">
			{correlations?.length > 0 ? (
				<CorrelationsTable correlations={correlations} />
			) : (
				<Typography>Подходящих перевозок не найдено</Typography>
			)}
		</Box>
	);
};

export default MatchesTab;
