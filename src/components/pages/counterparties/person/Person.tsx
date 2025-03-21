import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
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
import TrucksPhotos from "./TrucksPhotos";
import UserQuickInfo from "./UserQuickInfo";

const Person = ({ person }: { person: IProfile | null | undefined }) => {
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
		<Box maxWidth={800}>
			<Paper elevation={3} sx={{ m: 3, p: 3 }}>
				<Typography mb={3} variant="h3" color={"GrayText"} fontFamily={"monospace"}>
					Персональная информация
				</Typography>

				<Box ml={3}>
					<UserQuickInfo person={person} />
				</Box>

				<Stack mt={2} mx={2} spacing={1}>
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

			{person.role === PersonRole.DRIVER && (
				<Paper elevation={3} sx={{ m: 3, p: 3 }}>
					<Typography variant="h3" color={"GrayText"} fontFamily={"monospace"}>
						Грузовики
					</Typography>
					<TrucksPhotos person={person} />
				</Paper>
			)}

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
