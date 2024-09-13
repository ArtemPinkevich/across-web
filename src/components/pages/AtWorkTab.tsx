import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ApiCommonResult } from "../../models/commonApi";
import CorrelationsTable from "./correlations/CorrelationsTable";
import { useGetOrdersInProgressQuery } from "../../store/rtkQuery/ordersApi";

const AtWorkTab = () => {
	const navigate = useNavigate();
	const { data: response } = useGetOrdersInProgressQuery();

	if (!response || response.result === ApiCommonResult.Error) {
		return (
			<Box m="20px">
				<Typography>Активных перевозок не найдено</Typography>
			</Box>
		);
	}

	const correlations =
		response.ordersInProgress?.filter((o) => o.transportationOrder?.transportationOrderId !== undefined) ?? [];

	return (
		<Box m="20px">
			{correlations?.length > 0 ? (
				<CorrelationsTable
					correlations={correlations}
					onRowDoubleClick={(o) => navigate(`/correlationAtwork/${o.transportationOrder.transportationOrderId}`)}
				/>
			) : (
				<Typography>Активных перевозок не найдено</Typography>
			)}
		</Box>
	);
};

export default AtWorkTab;
