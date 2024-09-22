import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useClarifyMutation } from "../../../store/rtkQuery/ordersApi";
import { IClarifyRequest } from "../../../models/orders/orderModels";
import { ApiCommonResult } from "../../../models/commonApi";

type Props = {
	orderId: number;
	isOpen: boolean;
	onClose: () => void;
};

export default function ClarifyCorrelationModal(props: Props) {
	const { isOpen, onClose, orderId } = props;

	const [loadingTime, setLoadingTime] = React.useState("");
	const [loadingContactPerson, setLoadingContactPerson] = React.useState("");
	const [loadingContactPhone, setLoadingContactPhone] = React.useState("");
	const [unloadingContactPerson, setUnloadingContactPerson] = React.useState("");
	const [unloadingContactPhone, setUnloadingContactPhone] = React.useState("");

	const [clarify, { isLoading, error }] = useClarifyMutation();

	const handleClarify = async () => {
		const clarifyRequest: IClarifyRequest = {
			transportationOrderId: orderId,
			loadingTime,
			loadingContactPerson,
			loadingContactPhone,
			unloadingContactPerson,
			unloadingContactPhone,
		};

		const responce = await clarify(clarifyRequest).unwrap();
		if (responce?.result === ApiCommonResult.Ok) {
			onClose();
		}
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<React.Fragment>
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="ClarificationCorrelation-dialog-title"
				aria-describedby="ClarificationCorrelation-dialog-description"
			>
				<DialogTitle id="ClarificationCorrelation-dialog-title">{"Уточнение информации по перевозке"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="ClarificationCorrelation-dialog-description">
						Водитель увидет данную информацию только после закрепления груза за ним.
					</DialogContentText>
					<TextField
						autoFocus
						autoComplete="new-password"
						margin="dense"
						id="loading-time"
						label="Время прибытия машины на загрузку"
						fullWidth
						variant="outlined"
						value={loadingTime}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setLoadingTime(event.target.value);
						}}
					/>
					<TextField
						margin="dense"
						id="loading-time"
						label="Контактное лицо на загрузке"
						fullWidth
						variant="outlined"
						value={loadingContactPerson}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setLoadingContactPerson(event.target.value);
						}}
					/>
					<TextField
						margin="dense"
						id="loading-time"
						label="Телефон контактного лица на загрузке"
						fullWidth
						type="tel"
						variant="outlined"
						value={loadingContactPhone}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setLoadingContactPhone(event.target.value);
						}}
					/>
					<TextField
						margin="dense"
						id="loading-time"
						label="Контактное лицо на выгрузке"
						fullWidth
						variant="outlined"
						value={unloadingContactPerson}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setUnloadingContactPerson(event.target.value);
						}}
					/>
					<TextField
						margin="dense"
						id="loading-time"
						label="Телефон контактного лица на загрузке"
						fullWidth
						type="tel"
						variant="outlined"
						value={unloadingContactPhone}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setUnloadingContactPhone(event.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отмена</Button>
					{isLoading ? (
						<Box alignSelf={"end"} justifyContent={"right"}>
							<CircularProgress />
						</Box>
					) : (
						<Button onClick={handleClarify}>Уточнить</Button>
					)}
				</DialogActions>
				{error && (
					<Typography mb={2} mr={1} color={"red"} alignSelf={"end"} justifyContent={"right"}>
						Не удалось выполнить операцию.
					</Typography>
				)}
			</Dialog>
		</React.Fragment>
	);
}
