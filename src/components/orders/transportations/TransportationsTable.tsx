import { Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { placeToDisplayStringConverter } from "../../../models/places/PlaceToDisplayStringConverter";
import { TransportationStatus } from "../../../models/orders/TransportationStatus";
import { TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP } from "../../../models/orders/TransportationStatusToDisplayNameMap";
import { useNavigate } from "react-router-dom";
import { ITransportation } from "../../../models/orders/orderModels";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { DangerousGoodsToDisplayNameConverter } from "../../../models/truck/toDisplayNameMappers/DangerousGoodsToDisplayNameConverter";
import { PACKAGING_TYPE_DISPLAY_NAME_MAP } from "../../../models/cargo/PackagingTypeToDisplayNameMap";
import moment from "moment";

export type Props = {
	transportations: ITransportation[];
};

const TransportationsTable = (props: Props) => {
	const { transportations } = props;
	const navigate = useNavigate();

	const columns: GridColDef<(typeof transportations)[number]>[] = [
		{
			field: "fullName",
			headerName: "Груз",
			sortable: true,
			width: 150,
			valueGetter: (_, row) => row.cargo.name,
		},
		{
			field: "status",
			headerName: "Статус груза",
			width: 100,
			renderCell: (params) => {
				if (params.row.transportationStatus === TransportationStatus.carrierFinding) {
					return <Chip size="small" color={"success"} label={"Свободен"} />;
				}

				return (
					<Chip
						size="small"
						color={"default"}
						label={TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP.get(params.row.transportationStatus)}
					/>
				);
			},
		},
		{
			field: "from",
			headerName: "Откуда",
			width: 150,
			valueGetter: (_, row) =>
				`${placeToDisplayStringConverter(row.transferInfo.loadingPlace)}, ${row.transferInfo.loadingAddress}`,
		},
		{
			field: "to",
			headerName: "Куда",
			width: 150,
			valueGetter: (_, row) =>
				`${placeToDisplayStringConverter(row.transferInfo.unloadingPlace)}, ${row.transferInfo.unloadingAddress}`,
		},
		{
			field: "date",
			headerName: "Когда",
			width: 100,
			valueGetter: (_, row) => {
				let displyDate = row.transferInfo.loadingDateFrom
					? moment(row.transferInfo.loadingDateFrom).format("DD.MM.YYYY")
					: moment().format("DD.MM.YYYY");

				if (row.transferInfo.loadingDateTo) {
					displyDate += ` - ${moment(row.transferInfo.loadingDateTo).format("DD.MM.YYYY")}`;
				}

				return displyDate;
			},
		},
		{
			field: "weight",
			headerName: "Вес, т",
			sortable: true,
			width: 50,
			valueGetter: (_, row) => row.cargo.weight,
		},
		{
			field: "volume",
			headerName: "Объем, м³",
			sortable: true,
			width: 50,
			valueGetter: (_, row) => row.cargo.volume,
		},
		{
			field: "packagingType",
			headerName: "Тип упаковки",
			sortable: true,
			width: 150,
			valueGetter: (_, row) => PACKAGING_TYPE_DISPLAY_NAME_MAP.get(row.cargo.packagingType),
		},
		{
			field: "length",
			headerName: "Длина",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.cargo.length,
		},
		{
			field: "width",
			headerName: "Ширина",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.cargo.width,
		},
		{
			field: "height",
			headerName: "Высота",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.cargo.height,
		},
		{
			field: "carBodies",
			headerName: "Тип кузова",
			width: 150,
			valueGetter: (_, row) =>
				row.cargo.truckRequirements?.carBodies?.map((o) => CARBODY_DISPLAY_NAME_MAP.get(o)).join(", "),
		},
		{
			field: "loadingType",
			headerName: "Тип загрузки",
			width: 150,
			valueGetter: (_, row) =>
				row.cargo.truckRequirements?.loadingTypeDtos?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o)).join(", "),
		},
		{
			field: "hasLtl",
			headerName: "Догруз",
			width: 100,
			valueGetter: (_, row) => (row.cargo.truckRequirements?.hasLtl ? "✓" : "-"),
		},
		{
			field: "hasLiftgate",
			headerName: "Гидролифт",
			width: 100,
			valueGetter: (_, row) => (row.cargo.truckRequirements?.hasLiftgate ? "✓" : "-"),
		},
		{
			field: "hasStanchionTrailer",
			headerName: "Коники",
			width: 100,
			valueGetter: (_, row) => (row.cargo.truckRequirements?.hasStanchionTrailer ? "✓" : "-"),
		},
		{
			field: "Dangerous",
			headerName: "Опасный",
			width: 100,
			valueGetter: (_, row) => DangerousGoodsToDisplayNameConverter(row.cargo.truckRequirements),
		},
		{
			field: "tir",
			headerName: "TIR",
			width: 50,
			valueGetter: (_, row) => (row.cargo.truckRequirements?.tir ? "✓" : "-"),
		},
		{
			field: "ekmt",
			headerName: "EKMT",
			width: 50,
			valueGetter: (_, row) => (row.cargo.truckRequirements?.ekmt ? "✓" : "-"),
		},
	];

	return (
		<DataGrid
			onRowDoubleClick={(o) => navigate(`/transportations/${o.id}`)}
			rows={transportations}
			getRowId={(o) => o.transportationOrderId!}
			columns={columns}
			density="compact"
			hideFooter
			autoHeight
			localeText={{ noRowsLabel: "" }}
			initialState={{
				columns: {
					columnVisibilityModel: {
						length: false,
						width: false,
						height: false,
						carBodies: false,
						loadingType: false,
						hasLtl: false,
						hasLiftgate: false,
						hasStanchionTrailer: false,
						Dangerous: false,
						tir: false,
						ekmt: false,
					},
				},
			}}
		/>
	);
};

export default TransportationsTable;
