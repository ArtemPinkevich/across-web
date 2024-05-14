import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useGetPersonsQuery } from "../../services/persons";
import { AlertTitle } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import { useEffect } from "react";
import { setNotification } from "../../reducers/notificationReducer";
import { useIntl } from "react-intl";

const Notification = () => {
  const notification = useSelector((state: IRootState) => state.notification);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { isError, error } = useGetPersonsQuery();

  useEffect(() => {
    if (error !== undefined) {
      dispatch(
        setNotification({
          state: "error",
          message:
            "error" in error
              ? `${error.error}`
              : `${JSON.stringify("data" in error ? error.data : intl.formatMessage({ id: "unknownError" }))}`,
          isActive: true,
        }),
      );
    }
  }, [isError]);

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
      <Alert
        severity={notification.state}
        variant="filled"
        sx={{ width: "100%" }}
      >
        <AlertTitle>{notification.state.toUpperCase()}</AlertTitle>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
