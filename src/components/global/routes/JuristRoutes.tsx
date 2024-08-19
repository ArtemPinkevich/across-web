import { Routes, Route, useMatch } from "react-router-dom";
import ProfileTab from "../../pages/ProfileTab";
import { useGetPersonsQuery } from "../../../store/rtkQuery/persons";
import CounterpartiesTab from "../../pages/CounterpartiesTab";
import Correlation from "../../pages/correlations/Correlation";
import MatchesTab from "../../pages/MatchesTab";
import AtWorkTab from "../../pages/AtWorkTab";
import SearchCargoTab from "../../pages/SearchCargoTab";
import TransportationOrderDetails from "../../pages/transportations/TransportationOrderDetails";
import SearchTruckTab from "../../pages/SearchTruckTab";
import TruckDetails from "../../pages/trucks/TruckDetails";
import BidsTab from "../../pages/BidsTab";
import Person from "../../pages/counterparties/person/Person";

const JuristRoutes = () => {
	const counterpartiesMatch = useMatch("/counterparties/:id");
	const { data } = useGetPersonsQuery();
	const persons = data ?? [];

	const counterparty = counterpartiesMatch
		? persons.find((person) => person.id === counterpartiesMatch.params.id)
		: null;

	return (
		<Routes>
			<Route path="/" element={<CounterpartiesTab />} />
			<Route path="/counterparties" element={<CounterpartiesTab />} />
			<Route path="/counterparties/:id" element={<Person person={counterparty} />} />
			<Route path="/profile" element={<ProfileTab />} />
			<Route path="/bids" element={<BidsTab />} />
			<Route path="/matches" element={<MatchesTab />} />
			<Route path="/search" element={<SearchCargoTab />} />
			<Route path="/searchTruck" element={<SearchTruckTab />} />
			<Route path="/in-progress" element={<AtWorkTab />} />
			<Route path="/correlations/:id" element={<Correlation />} />
			<Route path="/transportations/:id" element={<TransportationOrderDetails />} />
			<Route path="/trucks/:id" element={<TruckDetails />} />
		</Routes>
	);
};

export default JuristRoutes;
