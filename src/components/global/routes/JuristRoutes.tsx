import { Routes, Route, useMatch } from "react-router-dom";
import Profile from "../profile/Profile";
import Person from "../../person/Person";
import { useGetPersonsQuery } from "../../../services/persons";
import Counterparties from "../../counterparties/Counterparties";
import Bids from "../../orders/Bids";
import Correlation from "../../orders/Correlation";

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
			<Route path="/correlations/:id" element={<Correlation />} />
		</Routes>
	);
};

export default JuristRoutes;
