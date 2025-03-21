import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ApiCommonResult } from "../../models/commonApi";
import CorrelationsTable from "./correlations/CorrelationsTable";
import { useGetBidsQuery } from "../../store/rtkQuery/ordersApi";

const BidsTab = () => {
	const navigate = useNavigate();
	const { data: bidsResponse } = useGetBidsQuery(undefined, {
		pollingInterval: 10000,
		skipPollingIfUnfocused: true,
	});

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
				<CorrelationsTable
					correlations={correlations}
					onRowDoubleClick={(o) => navigate(`/correlations/${o.transportationOrder.transportationOrderId}`)}
				/>
			) : (
				<Typography>Заявок не найдено</Typography>
			)}
		</Box>
	);
};

export default BidsTab;
