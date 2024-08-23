import { Box, Paper, Stack, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useGetProfileQuery } from "../../store/rtkQuery/profileApi";

const ProfileTab = () => {
	const intl = useIntl();

	const { data: profile } = useGetProfileQuery();

	if (!profile) {
		return <Box />;
	}

	return (
		<Box m="20px" maxWidth={800}>
			<Paper elevation={3} sx={{ m: 3, p: 3 }}>
				<Typography variant="h3" color={"GrayText"} fontFamily={"monospace"}>
					Персональная информация
				</Typography>
				<Stack mt={2} mx={2} spacing={1}>
					<Typography variant="h5">
						{`${profile.surname ?? ""} ${profile.name ?? ""} ${profile.patronymic ?? ""}`}
					</Typography>
					<Typography variant="h5">{`${intl.formatMessage({ id: profile.role })}`}</Typography>
					<Typography variant="h5">{profile.phoneNumber}</Typography>
				</Stack>
			</Paper>
		</Box>
	);
};

export default ProfileTab;
