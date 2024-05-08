import { Box } from "@mui/material";
import Header from "../global/Header";

export type PersonProps = {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  role: string;
  isConfirmed: boolean;
};

const Person = ({ person }: { person: PersonProps | null | undefined }) => {
  return (
    <Box m="20px">
      <Header
        title={`${person?.surname ?? ""} ${person?.name ?? ""} ${person?.patronymic ?? ""}`.toUpperCase()}
      />
    </Box>
  );
};

export default Person;
