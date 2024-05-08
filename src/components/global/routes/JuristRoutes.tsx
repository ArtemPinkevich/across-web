import { Routes, Route, useMatch } from "react-router-dom";
import Shippers from "../../reports/Shippers";
import Drivers from "../../reports/Drivers";
import Profile from "../profile/Profile";
import Person, { PersonProps } from "../../reports/Person";
import personService from "../../../services/persons";
import { useState, useEffect } from "react";

const JuristRoutes = () => {
  const shippersMatch = useMatch("/shippers/:id");
  const driversMatch = useMatch("/drivers/:id");
  const [persons, setPersons] = useState<PersonProps[]>([]);

  useEffect(() => {
    const getPersons = async () => {
      const p: PersonProps[] = await personService.getAll();
      setPersons(p);
    };
    getPersons();
  }, []);

  const shipper = shippersMatch
    ? persons.find((person) => person.id === shippersMatch.params.id)
    : null;
  const driver = driversMatch
    ? persons.find((person) => person.id === driversMatch.params.id)
    : null;

  return (
    <Routes>
      <Route path="/" element={<Shippers />} />
      <Route path="/shippers" element={<Shippers />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/shippers/:id" element={<Person person={shipper} />} />
      <Route path="/drivers/:id" element={<Person person={driver} />} />
    </Routes>
  );
};

export default JuristRoutes;
