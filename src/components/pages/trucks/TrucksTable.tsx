import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { DangerousGoodsToDisplayNameConverter } from "../../../models/truck/toDisplayNameMappers/DangerousGoodsToDisplayNameConverter";
import { ITruck } from "../../../models/truck/truck";

export type Props = {
	trucks: ITruck[];
};

const TrucksTable = (props: Props) => {
	const { trucks } = props;
	const navigate = useNavigate();

	const columns: GridColDef<(typeof trucks)[number]>[] = [
		{
			field: "carBodyType",
			headerName: "Тип кузова",
			sortable: true,
			width: 150,
			valueGetter: (_, row) => (row.carBodyType ? CARBODY_DISPLAY_NAME_MAP.get(row.carBodyType) : "—"),
		},
		{
			field: "weight",
			headerName: "Грузоподъемность, т",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.carryingCapacity,
		},
		{
			field: "volume",
			headerName: "Объем кузова, м³",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.bodyVolume,
		},
		{
			field: "length",
			headerName: "Длина",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.innerBodyLength,
		},
		{
			field: "width",
			headerName: "Ширина",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.innerBodyWidth,
		},
		{
			field: "height",
			headerName: "Высота",
			sortable: true,
			width: 100,
			valueGetter: (_, row) => row.innerBodyHeight,
		},
		{
			field: "loadingType",
			headerName: "Тип загрузки",
			width: 150,
			valueGetter: (_, row) => row.loadingType?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o)).join(", "),
		},
		{
			field: "hasLtl",
			headerName: "Догруз",
			width: 100,
			valueGetter: (_, row) => (row.hasLtl ? "✓" : "-"),
		},
		{
			field: "hasLiftgate",
			headerName: "Гидролифт",
			width: 100,
			valueGetter: (_, row) => (row.hasLiftgate ? "✓" : "-"),
		},
		{
			field: "hasStanchionTrailer",
			headerName: "Коники",
			width: 100,
			valueGetter: (_, row) => (row.hasStanchionTrailer ? "✓" : "-"),
		},
		{
			field: "Dangerous",
			headerName: "Опасный",
			width: 100,
			valueGetter: (_, row) => DangerousGoodsToDisplayNameConverter(row),
		},
		{
			field: "tir",
			headerName: "TIR",
			width: 50,
			valueGetter: (_, row) => (row.tir ? "✓" : "-"),
		},
		{
			field: "ekmt",
			headerName: "EKMT",
			width: 50,
			valueGetter: (_, row) => (row.ekmt ? "✓" : "-"),
		},
	];

	return (
		<DataGrid
			onRowDoubleClick={(o) => navigate(`/trucks/${o.id}`)}
			rows={trucks}
			getRowId={(o) => o.truckId!}
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
