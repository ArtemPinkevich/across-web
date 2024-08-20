import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { DangerousGoodsToDisplayNameConverter } from "../../../models/truck/toDisplayNameMappers/DangerousGoodsToDisplayNameConverter";
import { DriverDto } from "../../../models/search/Search";

export type Props = {
	drivers: DriverDto[];
};

const TrucksTable = (props: Props) => {
	const { drivers } = props;
	const navigate = useNavigate();

	const columns: GridColDef<(typeof drivers)[number]>[] = [
		{
			field: "driver",
			headerName: "Водитель",
			sortable: true,
			width: 150,
			valueGetter: (_, row) => `${row.surname} ${row.name}`,
		},
		{
			field: "carBodyType",
			headerName: "Тип кузова",
			sortable: true,
			width: 150,
			valueGetter: (_, row) => (row.truck.carBodyType ? CARBODY_DISPLAY_NAME_MAP.get(row.truck.carBodyType) : "—"),
		},
		{
			field: "weight",
			headerName: "Грузоподъемность, т",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.truck.carryingCapacity,
		},
		{
			field: "volume",
			headerName: "Объем кузова, м³",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.truck.bodyVolume,
		},
		{
			field: "length",
			headerName: "Длина",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.truck.innerBodyLength,
		},
		{
			field: "width",
			headerName: "Ширина",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.truck.innerBodyWidth,
		},
		{
			field: "height",
			headerName: "Высота",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.truck.innerBodyHeight,
		},
		{
			field: "loadingType",
			headerName: "Тип загрузки",
			width: 150,
			valueGetter: (_, row) => row.truck.loadingType?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o)).join(", "),
		},
		{
			field: "hasLtl",
			headerName: "Догруз",
			width: 100,
			valueGetter: (_, row) => (row.truck.hasLtl ? "✓" : "-"),
		},
		{
			field: "hasLiftgate",
			headerName: "Гидролифт",
			width: 100,
			valueGetter: (_, row) => (row.truck.hasLiftgate ? "✓" : "-"),
		},
		{
			field: "hasStanchionTrailer",
			headerName: "Коники",
			width: 100,
			valueGetter: (_, row) => (row.truck.hasStanchionTrailer ? "✓" : "-"),
		},
		{
			field: "Dangerous",
			headerName: "Опасный",
			width: 100,
			valueGetter: (_, row) => DangerousGoodsToDisplayNameConverter(row.truck),
		},
		{
			field: "tir",
			headerName: "TIR",
			width: 50,
			valueGetter: (_, row) => (row.truck.tir ? "✓" : "-"),
		},
		{
			field: "ekmt",
			headerName: "EKMT",
			width: 50,
			valueGetter: (_, row) => (row.truck.ekmt ? "✓" : "-"),
		},
	];

	return (
		<DataGrid
			onRowDoubleClick={(o) => navigate(`/trucks/${o.id}`)}
			rows={drivers}
			getRowId={(o) => o.truck.truckId!}
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
					},
				},
			}}
		/>
	);
};

export default TrucksTable;
