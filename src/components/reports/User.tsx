import { Box } from "@mui/material";
import Header from "../global/Header";

export type UserProps = {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
};

const User = ({ user }: { user: UserProps | null | undefined }) => {
  return (
    <Box m="20px">
      <Header
        title={`${user?.surname ?? ""} ${user?.name ?? ""} ${user?.patronymic ?? ""}`.toUpperCase()}
      />
    </Box>
  );
};

export default User;
