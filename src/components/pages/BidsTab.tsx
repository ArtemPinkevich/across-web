import { Box, Typography } from "@mui/material";
import { useGetBidsQuery } from "../../store/rtkQuery/searchApi";
import { ApiCommonResult } from "../../models/commonApi";
import CorrelationsTable from "./correlations/CorrelationsTable";

const BidsTab = () => {
	const { data: bidsResponse } = useGetBidsQuery();

	if (!bidsResponse || bidsResponse.result == ApiCommonResult.Error) {
		return (
			<Box m="20px">
				<Typography>Заявок не найдено</Typography>
			</Box>
		);
	}

	const correlations = bidsResponse.correlations.filter(
		(o) => o.transportationOrder?.transportationOrderId !== undefined,
	);

	return (
		<Box m="20px">
			{correlations?.length > 0 ? (
				<CorrelationsTable correlations={correlations} />
			) : (
				<Typography>Заявок не найдено</Typography>
			)}
		</Box>
	);
};

export default BidsTab;
