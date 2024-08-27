import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import { setNotification } from "../../store/slices/notificationSlice";

const Notification = () => {
	const notification = useSelector((state: IRootState) => state.notification);
	const dispatch = useDispatch();

	const handleOnClose = () => {
		dispatch(setNotification({ ...notification, isActive: false }));
	};

	return (
		<Snackbar
			open={notification.isActive}
			autoHideDuration={6000}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			onClose={handleOnClose}
		>
			<Alert severity={notification.state} variant="filled" sx={{ width: "100%" }}>
				<AlertTitle>{notification.state.toUpperCase()}</AlertTitle>
				{notification.message}
			</Alert>
		</Snackbar>
	);
};

export default Notification;
