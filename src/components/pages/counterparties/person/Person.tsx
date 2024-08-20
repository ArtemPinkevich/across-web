import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Divider,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import Documents from "./Documents";
import {
	IChangePersonStatusRequest,
	IProfile,
	PersonRole,
	PersonStatus,
	UserDocumentStatus,
} from "../../../../models/persons/personModels";
import { useChangePersonStatusMutation } from "../../../../store/rtkQuery/personsApi";
import { useState } from "react";

const Person = ({ person }: { person: IProfile | null | undefined }) => {
	const intl = useIntl();

	if (!person) {
		return <Box />;
	}

	const [changePersonStatus] = useChangePersonStatusMutation();
	const [approveDialogOpen, setApproveDialogOpen] = useState(false);
	const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);

	const fetchApprove = () => {
		const request: IChangePersonStatusRequest = {
			userId: person.id,
			personStatus: PersonStatus.CONFIRMED,
			comment: "",
		};

		changePersonStatus(request);
		setApproveDialogOpen(false);
	};

	const handleApprove = () => {
		if (
			person.documentDtos?.length === 0 ||
			person.documentDtos?.some((o) => o.documentStatus !== UserDocumentStatus.ACCEPTED)
		) {
			setApproveDialogOpen(true);
		} else {
			fetchApprove();
		}
	};

	const handleRevoke = () => {
		setRevokeDialogOpen(false);

		const request: IChangePersonStatusRequest = {
			userId: person.id,
			personStatus: PersonStatus.UNCONFIRMED,
			comment: "",
		};

		changePersonStatus(request);
	};

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
							color={person.status === PersonStatus.CONFIRMED ? "success" : "error"}
							label={intl.formatMessage({
								id: person.status === PersonStatus.CONFIRMED ? "confirmed" : "notConfirmed",
							})}
						/>
					</Stack>
					<Divider />
					<Box pt={1} alignSelf={"end"}>
						{person.status === PersonStatus.CONFIRMED ? (
							<Button color="warning" size="small" onClick={() => setRevokeDialogOpen(true)}>
								Отозвать подтверждение
							</Button>
						) : (
							<Button color="success" size="small" onClick={handleApprove}>
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
				<Documents documents={person.documentDtos ?? []} person={person} />
			</Paper>

			<Dialog fullWidth open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
				<DialogContent>
					<DialogContentText>Подтверждение операции.</DialogContentText>
					<Typography variant="body1" mt={2} fontFamily={"monospace"}>
						У данного пользователя не все документы подтверждены. Выдать подтверждение личности?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={() => setApproveDialogOpen(false)}>
						Отмена
					</Button>
					<Button variant="contained" onClick={fetchApprove} autoFocus>
						Выдать подтверждение
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog fullWidth open={revokeDialogOpen} onClose={() => setRevokeDialogOpen(false)}>
				<DialogContent>
					<DialogContentText>Подтверждение операции.</DialogContentText>
					<Typography variant="body1" mt={2} fontFamily={"monospace"}>
						После данной операции пользователь не сможет участвовать в сделках. Выдать подтверждение личности можно
						будет повторно.
					</Typography>
					<Typography variant="body1" mt={2} fontFamily={"monospace"}>
						Отозвать подтверждение личности?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={() => setRevokeDialogOpen(false)}>
						Отмена
					</Button>
					<Button variant="contained" onClick={handleRevoke}>
						Отозвать подтверждение
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Person;
