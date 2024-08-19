import { useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { PersonRole, PersonStatus } from "../../../models/persons/personModels";

type Props = {
	onFiltersChange: (personRole: PersonRole, personStatus: PersonStatus) => void;
};

const CounterpartiesFilters = (props: Props) => {
	const [selectedRole, setSelectedRole] = useState(PersonRole.NONE);
	const [selectedStatus, setSelectedStatus] = useState(PersonStatus.NONE);

	const handleOnRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSelectedRole = (event.target as HTMLInputElement).value as PersonRole;
		setSelectedRole(newSelectedRole);
		props.onFiltersChange(newSelectedRole, selectedStatus);
	};

	const handleOnStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSelectedStatus = (event.target as HTMLInputElement).value as PersonStatus;
		setSelectedStatus(newSelectedStatus);
		props.onFiltersChange(selectedRole, newSelectedStatus);
	};

	const handleOnClear = () => {
		setSelectedRole(PersonRole.NONE);
		setSelectedStatus(PersonStatus.NONE);
		props.onFiltersChange(PersonRole.NONE, PersonStatus.NONE);
	};

	return (
		<Stack direction="row" spacing={10}>
			<FormControl>
				<FormLabel id="status-radio-buttons-group-label">Статус подтверждения личности</FormLabel>
				<RadioGroup
					aria-labelledby="status-radio-buttons-group-label"
					name="status-radio-buttons-group"
					value={selectedStatus}
					onChange={handleOnStatusChange}
				>
					<FormControlLabel value={PersonStatus.NONE} control={<Radio />} label="Все" />
					<FormControlLabel value={PersonStatus.DOCUMENTS_MISSING} control={<Radio />} label="Документы отсутствуют" />
					<FormControlLabel value={PersonStatus.CONFIRMED} control={<Radio />} label="Подтвержден" />
					<FormControlLabel value={PersonStatus.UNCONFIRMED} control={<Radio />} label="Не подтвержден" />
				</RadioGroup>
			</FormControl>

			<FormControl>
				<FormLabel id="role-radio-buttons-group-label">Роль</FormLabel>
				<RadioGroup
					aria-labelledby="role-radio-buttons-group-label"
					name="radio-buttons-group"
					value={selectedRole}
					onChange={handleOnRoleChange}
				>
					<FormControlLabel value={PersonRole.NONE} control={<Radio />} label="Все" />
					<FormControlLabel value={PersonRole.DRIVER} control={<Radio />} label="Перевозчик" />
					<FormControlLabel value={PersonRole.SHIPPER} control={<Radio />} label="Грузоотправитель" />
				</RadioGroup>
			</FormControl>

			{(selectedRole !== PersonRole.NONE || selectedStatus !== PersonStatus.NONE) && (
				<Box>
					<Button size="small" variant="text" startIcon={<ClearIcon />} onClick={handleOnClear}>
						Сбросить фильтры
					</Button>
				</Box>
			)}
		</Stack>
	);
};

export default CounterpartiesFilters;
