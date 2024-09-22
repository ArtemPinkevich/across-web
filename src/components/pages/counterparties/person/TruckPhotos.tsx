import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserContentType } from "../../../../models/persons/personModels";
import { getUserContentFromBackend } from "../../../../services/ImageHelper";
import { ITruck } from "../../../../models/truck/truck";

export type DocsProps = {
	userId: string;
	truck: ITruck;
};

const TruckPhotos = (props: DocsProps) => {
	const { truck, userId } = props;

	const [frontTruckPhoto, setFrontTruckPhoto] = useState<string>();
	const [backTruckPhoto, setBackTruckPhoto] = useState<string>();
	const [leftTruckPhoto, setLeftTruckPhoto] = useState<string>();
	const [rightTruckPhoto, setRightTruckPhoto] = useState<string>();

	useEffect(() => {
		getImageFromBackendAsync();
	}, []);

	const getImageFromBackendAsync = async () => {
		if (!truck?.truckId) {
			return;
		}

		const front = await getUserContentFromBackend(UserContentType.TRUCK_PHOTO_FRONT, userId, truck.truckId.toString());
		setFrontTruckPhoto(front);
		const back = await getUserContentFromBackend(UserContentType.TRUCK_PHOTO_BACK, userId, truck.truckId.toString());
		setBackTruckPhoto(back);
		const left = await getUserContentFromBackend(UserContentType.TRUCK_PHOTO_LEFT, userId, truck.truckId.toString());
		setLeftTruckPhoto(left);
		const right = await getUserContentFromBackend(UserContentType.TRUCK_PHOTO_RIGHT, userId, truck.truckId.toString());
		setRightTruckPhoto(right);
	};

	return (
		<Stack direction={"column"} spacing={1}>
			{frontTruckPhoto ? (
				<Box component="img" sx={{ maxWidth: { xs: 300, sm: 400, md: 500 } }} src={frontTruckPhoto} />
			) : (
				<Typography fontSize={12} color={"red"}>
					Фото спереди отсутствует
				</Typography>
			)}

			{backTruckPhoto ? (
				<Box component="img" sx={{ maxWidth: { xs: 300, sm: 400, md: 500 } }} src={backTruckPhoto} />
			) : (
				<Typography fontSize={12} color={"red"}>
					Фото сзади отсутствует
				</Typography>
			)}

			{leftTruckPhoto ? (
				<Box component="img" sx={{ maxWidth: { xs: 300, sm: 400, md: 500 } }} src={leftTruckPhoto} />
			) : (
				<Typography fontSize={12} color={"red"}>
					Фото слева отсутствует
				</Typography>
			)}

			{rightTruckPhoto ? (
				<Box component="img" sx={{ maxWidth: { xs: 300, sm: 400, md: 500 } }} src={rightTruckPhoto} />
			) : (
				<Typography fontSize={12} color={"red"}>
					Фото справа отсутствует
				</Typography>
			)}
		</Stack>
	);
};

export default TruckPhotos;
