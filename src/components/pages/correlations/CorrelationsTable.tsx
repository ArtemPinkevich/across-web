import { Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { placeToDisplayStringConverter } from "../../../models/places/PlaceToDisplayStringConverter";
import { TransportationStatus } from "../../../models/orders/TransportationStatus";
import { TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP } from "../../../models/orders/TransportationStatusToDisplayNameMap";
import { useNavigate } from "react-router-dom";
import { ICorrelation } from "../../../models/orders/orderModels";

export type Props = {
	correlations: ICorrelation[];
};

const CorrelationsTable = (props: Props) => {
	const { correlations } = props;
	const navigate = useNavigate();

	const columns: GridColDef<(typeof correlations)[number]>[] = [
		{
			field: "fullName",
			headerName: "Груз",
			sortable: true,
			width: 150,
			valueGetter: (_, row) => row.transportation.cargo.name,
		},
		{
			field: "shipper",
			headerName: "Отправитель",
			width: 200,
			valueGetter: (_, row) => `${row.shipper.surname || ""} ${row.shipper.name || ""} ${row.shipper.patronymic || ""}`,
		},
		{
			field: "shipperPhone",
			headerName: "Телефон отправителя",
			width: 100,
			valueGetter: (_, row) => row.shipper.phoneNumber,
		},
		{
			field: "from",
			headerName: "Откуда",
			width: 100,
			valueGetter: (_, row) => placeToDisplayStringConverter(row.transportation.transferInfo.loadingPlace),
		},
		{
			field: "to",
			headerName: "Куда",
			width: 100,
			valueGetter: (_, row) => placeToDisplayStringConverter(row.transportation.transferInfo.unloadingPlace),
		},
		{
			field: "date",
			headerName: "Когда",
			width: 100,
			valueGetter: (_, row) => row.transportation.transferInfo.loadingDateFrom,
		},
		{
			field: "driver",
			headerName: "Перевозчик",
			width: 250,
			valueGetter: (_, row) => `${row.driver.surname || ""} ${row.driver.name || ""} ${row.driver.patronymic || ""}`,
		},
		{
			field: "driverPhone",
			headerName: "Телефон перевозчика",
			width: 100,
			valueGetter: (_, row) => row.driver.phoneNumber,
		},
		{
			field: "status",
			headerName: "Статус груза",
			width: 100,
			renderCell: (params) => {
				if (params.row.transportation.transportationStatus === TransportationStatus.carrierFinding) {
					return <Chip size="small" color={"success"} label={"Свободен"} />;
				}

				return (
					<Chip
						size="small"
						color={"default"}
						label={TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP.get(params.row.transportation.transportationStatus)}
					/>
				);
			},
		},
	];

	return (
		<DataGrid
			onRowDoubleClick={(o) => navigate(`/correlations/${o.id}`)}
			rows={correlations}
			getRowId={(o) => o.transportation.transportationOrderId!}
			columns={columns}
			density="compact"
			hideFooter
		/>
	);
};

export default CorrelationsTable;
