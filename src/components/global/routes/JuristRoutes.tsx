import { Routes, Route, useMatch } from "react-router-dom";
import Profile from "../profile/Profile";
import Person from "../../person/Person";
import { useGetPersonsQuery } from "../../../store/rtkQuery/persons";
import Counterparties from "../../counterparties/Counterparties";
import Bids from "../../orders/BidsTab";
import Correlation from "../../orders/correlations/Correlation";
import MatchesTab from "../../orders/MatchesTab";
import AtWorkTab from "../../orders/AtWorkTab";
import SearchTab from "../../orders/SearchTab";
import TransportationOrderDetails from "../../orders/transportations/TransportationOrderDetails";
import SearchTruckTab from "../../orders/SearchTruckTab";
import TruckDetails from "../../orders/trucks/TruckDetails";

const JuristRoutes = () => {
	const counterpartiesMatch = useMatch("/counterparties/:id");
	const { data } = useGetPersonsQuery();
	const persons = data ?? [];

	const counterparty = counterpartiesMatch
		? persons.find((person) => person.id === counterpartiesMatch.params.id)
		: null;

	return (
		<Routes>
			<Route path="/" element={<Counterparties />} />
			<Route path="/counterparties" element={<Counterparties />} />
			<Route path="/counterparties/:id" element={<Person person={counterparty} />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/bids" element={<Bids />} />
			<Route path="/matches" element={<MatchesTab />} />
			<Route path="/search" element={<SearchTab />} />
			<Route path="/searchTruck" element={<SearchTruckTab />} />
			<Route path="/in-progress" element={<AtWorkTab />} />
			<Route path="/correlations/:id" element={<Correlation />} />
			<Route path="/transportations/:id" element={<TransportationOrderDetails />} />
			<Route path="/trucks/:id" element={<TruckDetails />} />
		</Routes>
	);
};

export default JuristRoutes;
