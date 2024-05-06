import { Routes, Route, useMatch } from "react-router-dom";
import Shippers from "../../reports/Shippers";
import Drivers from "../../reports/Drivers";
import Profile from "../Profile";
import User, { UserProps } from "../../reports/User";

const JuristRoutes = () => {
  const shippersMatch = useMatch("/shippers/:id");
  const driversMatch = useMatch("/drivers/:id");

  const id: string = "4bd64e27-cb7f-41b7-9a48-52a0bc3cd3bc";
  const users: UserProps[] = [
    {
      id: id,
      name: "Roman",
      surname: "Permyakov",
      patronymic: "Jurievich",
      birthDate: "02.12.1984",
      phoneNumber: "+72222222222",
      email: "permyakov@permyakov.ru",
    },
  ];

  const shipper = shippersMatch
    ? users.find((user) => user.id === shippersMatch.params.id)
    : null;
  const driver = driversMatch
    ? users.find((user) => user.id === driversMatch.params.id)
    : null;

  return (
    <Routes>
      <Route path="/" element={<Shippers />} />
      <Route path="/shippers" element={<Shippers />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/shippers/:id" element={<User user={shipper} />} />
      <Route path="/drivers/:id" element={<User user={driver} />} />
    </Routes>
  );
};

export default JuristRoutes;
