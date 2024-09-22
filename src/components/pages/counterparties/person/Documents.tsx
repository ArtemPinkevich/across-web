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
import { useEffect, useState } from "react";
import DocumentFullScreenDialog from "./DocumentFullScreen";
import {
	IChangeDocumentStatusRequest,
	IProfile,
	IUserDocument,
	UserDocumentStatus,
	UserContentType,
} from "../../../../models/persons/personModels";
import {
	documentStatusToDisplayStringConverter,
	userContentTypeToDisplayStringConverter,
} from "../../../../models/persons/documentConverters";
import { getUserContentFromBackend } from "../../../../services/ImageHelper";
import { useChangeDocStatusMutation } from "../../../../store/rtkQuery/personsApi";

export type DocsProps = {
	documents: IUserDocument[];
	person: IProfile;
};

const Documents = (props: DocsProps) => {
	const { documents, person } = props;

	const [rejectedDocument, setRejectedDocument] = useState<IUserDocument>();
	const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
	const [fullscreenDocumentTitle, setFullscreenDocumentTitle] = useState("");
	const [fullscreenDocument, setFullscreenDocument] = useState<IUserDocument>();
	const [documentImagesMap, setDocumentImagesMap] = useState<Map<UserContentType, string>>(new Map());

	const [changeDocStatus] = useChangeDocStatusMutation();

	useEffect(() => {
		documents?.forEach((o) => getImageFromBackendAsync(o));
	}, []);

	const getImageFromBackendAsync = async (document: IUserDocument) => {
		if (
			(document?.documentType || document?.documentType === 0) &&
			document.documentStatus != UserDocumentStatus.NONE
		) {
			const base64 = await getUserContentFromBackend(document.documentType, person.id);
			if (base64) {
				setDocumentImagesMap((prev) => new Map(prev.set(document.documentType, base64)));
			}
		}
	};

	const handleDocumentImageClick = (document: IUserDocument) => {
		setFullscreenDocument(document);
		setFullscreenDocumentTitle(userContentTypeToDisplayStringConverter(document.documentType));
		setDocumentDialogOpen(true);
	};

	const handleDocumentAccept = (document: IUserDocument) => {
		const request: IChangeDocumentStatusRequest = {
			userId: person.id,
			documentType: document.documentType,
			documentStatus: UserDocumentStatus.ACCEPTED,
			comment: "",
		};

		changeDocStatus(request);
	};

	const handleRejectClick = (document: IUserDocument) => {
		setRejectedDocument(document);
		setRejectDialogOpen(true);
	};

	const handleRejectCancel = () => {
		setRejectReason("");
		setRejectDialogOpen(false);
	};

	const handleRejectConfirm = () => {
		setRejectReason("");
		setRejectDialogOpen(false);

		if (rejectedDocument) {
			const request: IChangeDocumentStatusRequest = {
				userId: person.id,
				documentType: rejectedDocument.documentType,
				documentStatus: UserDocumentStatus.REJECTED,
				comment: rejectReason,
			};

			changeDocStatus(request);
		}
	};

	return (
		<Stack direction={"column"} m={3}>
			{documents.map((document) => (
				<Accordion key={document.documentType}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
						{userContentTypeToDisplayStringConverter(document.documentType)}
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
												: "red" // rejected
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
									maxWidth: { xs: 300, sm: 400, md: 500 },
								}}
								src={documentImagesMap.get(document.documentType)}
								//src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
							/>
						</Stack>
					</AccordionDetails>
					<AccordionActions>
						{(document?.documentStatus === UserDocumentStatus.ACCEPTED ||
							document?.documentStatus === UserDocumentStatus.VERIFICATION) && (
							<Button color="warning" onClick={() => handleRejectClick(document)}>
								Отклонить
							</Button>
						)}
						{(document?.documentStatus === UserDocumentStatus.VERIFICATION ||
							document?.documentStatus === UserDocumentStatus.REJECTED) && (
							<Button color="success" onClick={() => handleDocumentAccept(document)}>
								Подтвердить
							</Button>
						)}
					</AccordionActions>
				</Accordion>
			))}

			<DocumentFullScreenDialog
				isOpen={documentDialogOpen}
				title={fullscreenDocumentTitle}
				imgSrc={
					fullscreenDocument?.documentType || fullscreenDocument?.documentType === 0
						? documentImagesMap.get(fullscreenDocument.documentType) ?? ""
						: ""
				}
				//imgSrc="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
				onClose={() => setDocumentDialogOpen(false)}
			/>

			<Dialog fullWidth open={rejectDialogOpen} onClose={handleRejectCancel}>
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
					<Button variant="contained" onClick={handleRejectCancel}>
						Отмена
					</Button>
					<Button variant="contained" onClick={handleRejectConfirm} autoFocus>
						ОК
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
};

export default Documents;
