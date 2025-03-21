import { Chip, Stack } from "@mui/material";
import {
	DataGrid,
	GridCallbackDetails,
	GridColDef,
	GridEventListener,
	GridRowParams,
	MuiEvent,
} from "@mui/x-data-grid";
import { useIntl } from "react-intl";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetPersonsQuery } from "../../store/rtkQuery/personsApi";
import CounterpartiesFilters from "./counterparties/CounterpartiesFilters";
import { IProfile, PersonRole, PersonStatus } from "../../models/persons/personModels";

const CounterpartiesTab = () => {
	const navigate = useNavigate();
	const intl = useIntl();
	const [trigger, { data }] = useLazyGetPersonsQuery();
	const [filtredPersons, setFiltredPersons] = useState<IProfile[]>([]);

	useEffect(() => {
		const getPersonsAsync = async () => {
			const result = await trigger();
			setFiltredPersons(result?.data ?? []);
		};

		getPersonsAsync();
	}, []);

	const columns: GridColDef<(typeof filtredPersons)[number]>[] = [
		{
			field: "fullName",
			headerName: intl.formatMessage({ id: "fullName" }),
			sortable: true,
			width: 250,
			valueGetter: (_, row) => `${row.surname || ""} ${row.name || ""} ${row.patronymic || ""}`,
		},
		{
			field: "role",
			headerName: intl.formatMessage({ id: "role" }),
			width: 150,
			valueGetter: (_, row) => (row.role === PersonRole.SHIPPER ? "Грузоотправитель" : "Перевозчик"),
		},
		{
			field: "phoneNumber",
			headerName: intl.formatMessage({ id: "phoneNumber" }),
			width: 150,
		},
		{
			field: "status",
			headerName: intl.formatMessage({ id: "status" }),
			width: 250,
			renderCell: (params) => {
				if (!params.row.status || params.row.status === PersonStatus.DOCUMENTS_MISSING) {
					return <Chip size="small" color={"default"} label={"Документы отсутствуют"} />;
				}

				if (params.row.status === PersonStatus.CONFIRMED) {
					return <Chip size="small" color={"success"} label={"Подтверждена"} />;
				}

				if (params.row.status === PersonStatus.UNCONFIRMED) {
					return <Chip size="small" color={"error"} label={"Не подтверждена"} />;
				}
			},
		},
	];

	const handleOnRowDoubleClick: GridEventListener<"rowDoubleClick"> = (
		params: GridRowParams,
		_event: MuiEvent<React.MouseEvent<HTMLElement>>,
		_details: GridCallbackDetails,
	) => {
		navigate(`/counterparties/${params.id}`, { replace: false });
	};

	const handleOnFiltersChange = (role: PersonRole, status: PersonStatus) => {
		let newFiltredPersons = data ?? [];
		if (role !== PersonRole.NONE) {
			newFiltredPersons = newFiltredPersons.filter((o) => o.role === role);
		}
		if (status !== PersonStatus.NONE) {
			newFiltredPersons = newFiltredPersons.filter((o) => o.status === status);
		}

		setFiltredPersons(newFiltredPersons);
	};

	return (
		<Stack direction={"column"} m={3} spacing={3}>
			<CounterpartiesFilters onFiltersChange={handleOnFiltersChange} />
			<DataGrid
				onRowDoubleClick={handleOnRowDoubleClick}
				rows={filtredPersons}
				columns={columns}
				density="compact"
				autoHeight
				hideFooter
				localeText={{ noRowsLabel: "" }}
			/>
		</Stack>
	);
};

export default CounterpartiesTab;
