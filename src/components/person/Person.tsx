import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import Documents from "./Documents";
import { PersonStatus, IUserDocument, PersonRole } from "../../models/persons/personModels";

export type PersonProps = {
	id: string;
	name: string;
	surname: string;
	patronymic: string;
	birthDate: string;
	phoneNumber: string;
	email: string;
	role: string;
	approvementStatus: PersonStatus;
	documentDtos: IUserDocument[];
};

const Person = ({ person }: { person: PersonProps | null | undefined }) => {
	const intl = useIntl();
	if (!person) {
		return <Box />;
	}

	return (
		<Box>
			<Paper elevation={3} sx={{ m: 3, p: 3 }}>
				<Typography variant="h3" color={"GrayText"} fontFamily={"monospace"}>
					Персональная информация
				</Typography>
				<Stack mt={2} mx={2} spacing={1}>
					<Typography variant="h5">
						{`${person.surname ?? ""} ${person.name ?? ""} ${person.patronymic ?? ""}`}
					</Typography>
					<Typography variant="h5">{`${person.role === PersonRole.SHIPPER ? "Грузоотправитель" : "Перевозчик"}`}</Typography>
					<Typography variant="h5">{person.phoneNumber}</Typography>
					<Stack direction={"row"} spacing={2}>
						<Typography variant="h5">Статус:</Typography>
						<Chip
							size="small"
							color={person.approvementStatus === PersonStatus.CONFIRMED ? "success" : "error"}
							label={intl.formatMessage({
								id: person.approvementStatus === PersonStatus.CONFIRMED ? "confirmed" : "notConfirmed",
							})}
						/>
					</Stack>
					<Divider />
					<Box pt={1} alignSelf={"end"}>
						{person.approvementStatus === PersonStatus.CONFIRMED ? (
							<Button color="warning" size="small">
								Отозвать подтверждение
							</Button>
						) : (
							<Button color="success" size="small">
								Выдать подтверждение
							</Button>
						)}
					</Box>
				</Stack>
			</Paper>

			<Paper elevation={3} sx={{ m: 3, p: 3 }}>
				<Typography variant="h3" color={"GrayText"} fontFamily={"monospace"}>
					Документы
				</Typography>
				<Documents documents={person.documentDtos ?? []} />
			</Paper>
		</Box>
	);
};

export default Person;
