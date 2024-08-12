import { AppBar, Box, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type DocumentFullScreenProps = {
	imgSrc: string;
	title: string;
	isOpen: boolean;
	onClose: () => void;
};

const DocumentFullScreenDialog = (props: DocumentFullScreenProps) => {
	const { imgSrc, title, isOpen, onClose } = props;

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog fullScreen open={isOpen} onClose={handleClose}>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{title}
					</Typography>
					<IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Box>
				<img src={imgSrc} />
			</Box>
		</Dialog>
	);
};

export default DocumentFullScreenDialog;
