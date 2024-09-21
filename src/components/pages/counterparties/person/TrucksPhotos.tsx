import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IProfile } from "../../../../models/persons/personModels";
import { useGetTrucksQuery } from "../../../../store/rtkQuery/truckApi";
import { TRAILER_TYPE_DISPLAY_NAME_MAP } from "../../../../models/truck/toDisplayNameMappers/TrailerTypeToDisplayNameMap";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../../models/truck/toDisplayNameMappers/CarBodyToDisplayNameMap";
import TruckPhotos from "./TruckPhotos";

export type DocsProps = {
	person: IProfile;
};

const TrucksPhotos = (props: DocsProps) => {
	const { person } = props;
	const { data: trucks } = useGetTrucksQuery(person.id);

	return (
		<Stack direction={"column"} m={3}>
			{trucks?.trucks.map((truck) => (
				<Accordion key={truck.truckId}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
						{(truck.trailerType || truck.trailerType === 0) && TRAILER_TYPE_DISPLAY_NAME_MAP.get(truck.trailerType)}
						<Box ml={1} display="flex" alignItems="center" justifyContent="center">
							<Typography fontSize={12}>
								{(truck.carBodyType || truck.carBodyType === 0) && CARBODY_DISPLAY_NAME_MAP.get(truck.carBodyType)}
							</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<TruckPhotos truck={truck} userId={person.id} />
					</AccordionDetails>
				</Accordion>
			))}
		</Stack>
	);
};

export default TrucksPhotos;
