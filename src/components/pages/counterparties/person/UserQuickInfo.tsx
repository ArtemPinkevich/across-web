import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IProfile, PersonRole, PersonStatus, UserDocumentType } from "../../../../models/persons/personModels";
import { getImageFromBackend } from "../../../../services/ImageHelper";

export type DocsProps = {
	person: IProfile;
};

const UserQuickInfo = (props: DocsProps) => {
	const { person } = props;
	const [base64FromServer, setBase64FromServer] = useState<string>();

	useEffect(() => {
		getImageFromBackendAsync(UserDocumentType.AVATAR);
	}, []);

	const getImageFromBackendAsync = async (docType: UserDocumentType) => {
		const base64 = await getImageFromBackend(docType, person.id);
		setBase64FromServer(base64);
	};

	return (
		<Card sx={{ maxWidth: 400 }}>
			<CardContent>
				<Stack direction={"row"} spacing={3}>
					<Box alignSelf={"center"}>
						<Avatar src={base64FromServer} sx={{ width: 80, height: 80 }}>
							{person.name?.charAt(0) ?? "A"}
						</Avatar>
					</Box>
					<Stack direction={"column"} spacing={0.2}>
						<Typography>{`${person.role === PersonRole.SHIPPER ? "Грузоотправитель" : "Перевозчик"}`}</Typography>
						<Typography variant="h5">{person.phoneNumber}</Typography>
						<Typography variant="body1">
							{`${person.surname ?? ""} ${person.name ?? ""} ${person.patronymic ?? ""}`}
						</Typography>
						<Chip
							size="small"
							color={person.status === PersonStatus.CONFIRMED ? "success" : "error"}
							label={person.status === PersonStatus.CONFIRMED ? "подтвержден" : "не подтвержден"}
						/>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default UserQuickInfo;
