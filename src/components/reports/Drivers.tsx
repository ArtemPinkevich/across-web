import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme/theme";
import { Link } from "react-router-dom";
import Header from "../global/Header";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useIntl } from "react-intl";
import { useState } from "react";
import FormControl from "../global/FormControl";

const Drivers = () => {
  const settings = useSelector((state: IRootState) => state.settings);
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);
  const colors = tokens(settings.mode);

  const linkStyle = {
    color: colors.greenAccent[300],
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
      renderCell: (id) => (
        <Link to={`/drivers/${id.value}`} style={linkStyle}>
          {id.value}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      editable: true,
    },
    {
      field: "surname",
      headerName: "Surname",
      editable: true,
    },
    {
      field: "patronymic",
      headerName: "Patronymic",
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
      valueGetter: (_, row) =>
        `${row.surname || ""} ${row.name || ""} ${row.patronymic || ""}`,
    },
    {
      field: "birthDate",
      headerName: "BirthDate",
      width: 100,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "PhoneNumber",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: true,
    },
  ];

  const id: string = "4bd64e27-cb7f-41b7-9a48-52a0bc3cd3bc";

  const rows = [
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

  const handleOnSwitchChange = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <Box m="20px">
      <Header title={intl.formatMessage({ id: "drivers" }).toUpperCase()} />
      <FormControl checked={showAll} onChange={handleOnSwitchChange} />
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};

export default Drivers;
