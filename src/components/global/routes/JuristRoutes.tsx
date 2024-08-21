import { Routes, Route, useMatch, Navigate } from "react-router-dom";
import ProfileTab from "../../pages/ProfileTab";
import { useGetPersonsQuery } from "../../../store/rtkQuery/personsApi";
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
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { PersonRole } from "../../../models/persons/personModels";
import SignInTab from "../../pages/SignInTab";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";

const JuristRoutes = () => {
	const counterpartiesMatch = useMatch("/counterparties/:id");
	const isLogined = useSelector((state: IRootState) => state.auth.isLogined);
	const { data: profile } = useGetProfileQuery();
	const { data } = useGetPersonsQuery();
	const persons = data ?? [];

	const counterparty = counterpartiesMatch
		? persons.find((person) => person.id === counterpartiesMatch.params.id)
		: null;

	if (!isLogined) {
		return (
			<Routes>
				<Route path="/" element={<SignInTab />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		);
	}

	if (profile?.role === PersonRole.LAWYER) {
		return (
			<Routes>
				<Route path="/" element={<CounterpartiesTab />} />
				<Route path="/counterparties" element={<CounterpartiesTab />} />
				<Route path="/counterparties/:id" element={<Person person={counterparty} />} />
				<Route path="/profile" element={<ProfileTab />} />
				<Route path="/sign-in" element={<SignInTab />} />
			</Routes>
		);
	}

	if (profile?.role === PersonRole.ADMIN) {
		return (
			<Routes>
				<Route path="/" element={<BidsTab />} />
				<Route path="/profile" element={<ProfileTab />} />
				<Route path="/bids" element={<BidsTab />} />
				<Route path="/matches" element={<MatchesTab />} />
				<Route path="/search" element={<SearchCargoTab />} />
				<Route path="/searchTruck" element={<SearchTruckTab />} />
				<Route path="/in-progress" element={<AtWorkTab />} />
				<Route path="/correlations/:id" element={<Correlation />} />
				<Route path="/transportations/:id" element={<TransportationOrderDetails />} />
				<Route path="/trucks/:id" element={<TruckDetails />} />
				<Route path="/sign-in" element={<SignInTab />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path="/" element={<SignInTab />} />
			<Route path="/profile" element={<ProfileTab />} />
			<Route path="/sign-in" element={<SignInTab />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default JuristRoutes;
