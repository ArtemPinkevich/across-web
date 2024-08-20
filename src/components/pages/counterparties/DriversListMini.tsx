import { Button, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../../store/store";
import { useEffect } from "react";
import { useGetPersonsQuery } from "../../../store/rtkQuery/personsApi";
import { setSettings } from "../../../store/slices/settingsSlice";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PersonStatus } from "../../../models/persons/personModels";

const DriversList = () => {
	const settings = useSelector((state: IRootState) => state.settings);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { data } = useGetPersonsQuery();

	const drivers = data !== undefined ? data.filter((person) => person.role === "Driver") : [];

	useEffect(() => {
		dispatch(setSettings({ ...settings, filter: "" }));
	}, []);

	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 1200,
				// bgcolor: 'background.paper'
				bgcolor: "rgba(39, 39, 39, 0.5)",
			}}
		>
			{drivers.map((o) => (
				<React.Fragment key={o.id}>
					<ListItem
						alignItems="flex-start"
						secondaryAction={
							<Button
								variant="contained"
								size="small"
								color="info"
								onClick={() => navigate(`/drivers/${o.id}`, { replace: false })}
							>
								🢂
							</Button>
						}
					>
						<ListItemText
							sx={{ mr: 20, my: 0 }}
							primary={`${o.name} ${o.patronymic} ${o.surname}`}
							secondary={
								<React.Fragment>
									{o.status === PersonStatus.CONFIRMED ? (
										<Typography variant="body2" color="forestgreen">
											Подтвержден
										</Typography>
									) : (
										<Typography variant="body2" color="red">
											Не подтвержден
										</Typography>
									)}
								</React.Fragment>
							}
						/>
					</ListItem>
					<Divider variant="middle" />
				</React.Fragment>
			))}
		</List>
	);
};

export default DriversList;
