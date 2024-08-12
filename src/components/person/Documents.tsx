import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import DocumentFullScreenDialog from "./DocumentFullScreen";
import {
	documentTypeToDisplayStringConverter,
	documentStatusToDisplayStringConverter,
} from "../../models/persons/documentConverters";
import { IUserDocument, UserDocumentStatus } from "../../models/persons/personModels";

export type DocsProps = {
	documents: IUserDocument[];
};

const Documents = (props: DocsProps) => {
	const { documents } = props;

	const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
	const [rejectReason, setRejectReason] = useState("");

	const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
	const [fullscreenDocumentTitle, setFullscreenDocumentTitle] = useState("");

	const handleDocumentImageClick = (document: IUserDocument) => {
		setFullscreenDocumentTitle(documentTypeToDisplayStringConverter(document.documentType));
		setDocumentDialogOpen(true);
	};

	const handleDocumentDialogClose = () => {
		setDocumentDialogOpen(false);
	};

	const handleRejectClick = () => {
		setRejectDialogOpen(true);
	};

	const handleRejectDialogClose = () => {
		setRejectReason("");
		setRejectDialogOpen(false);
	};

	return (
		<Stack direction={"column"} m={3}>
			{documents.map((document) => (
				<Accordion key={document.documentType}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
						{documentTypeToDisplayStringConverter(document.documentType)}
						<Box ml={1} display="flex" alignItems="center" justifyContent="center">
							<Typography
								fontSize={12}
								color={
									document?.documentStatus === UserDocumentStatus.NONE
										? "gray"
										: document?.documentStatus === UserDocumentStatus.ACCEPTED
											? "green"
											: document?.documentStatus === UserDocumentStatus.VERIFICATION
												? "orange"
												: "red"
								}
							>
								{documentStatusToDisplayStringConverter(document.documentStatus)}
							</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<Stack direction={"column"}>
							<Box
								component="img"
								onClick={() => handleDocumentImageClick(document)}
								sx={{
									//maxHeight: { xs: 167, sm: 233, md: 500 },
									maxWidth: { xs: 300, sm: 400, md: 500 },
								}}
								alt="The house from the offer."
								src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
							/>
						</Stack>
					</AccordionDetails>
					<AccordionActions>
						{(document?.documentStatus === UserDocumentStatus.ACCEPTED ||
							document?.documentStatus === UserDocumentStatus.VERIFICATION) && (
							<Button color="warning" onClick={handleRejectClick}>
								Отклонить
							</Button>
						)}
						{(document?.documentStatus === UserDocumentStatus.VERIFICATION ||
							document?.documentStatus === UserDocumentStatus.REJECTED) && <Button color="success">Подтвердить</Button>}
					</AccordionActions>
				</Accordion>
			))}

			<DocumentFullScreenDialog
				isOpen={documentDialogOpen}
				title={fullscreenDocumentTitle}
				imgSrc="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
				onClose={handleDocumentDialogClose}
			/>

			<Dialog fullWidth open={rejectDialogOpen} onClose={handleRejectDialogClose}>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Укажите, пожалуйста, причину отказа.</DialogContentText>
					<TextField
						id="outlined-basic"
						autoFocus
						fullWidth
						margin="normal"
						variant="outlined"
						value={rejectReason}
						inputProps={{ maxLength: 200 }}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setRejectReason(event.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleRejectDialogClose}>
						Отмена
					</Button>
					<Button variant="contained" onClick={handleRejectDialogClose} autoFocus>
						ОК
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
};

export default Documents;
