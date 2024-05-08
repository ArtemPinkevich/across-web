import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme/theme";
import Header from "../global/Header";
import { useIntl } from "react-intl";
import { useState, useEffect } from "react";
import FormControl from "../global/FormControl";
import { PersonProps } from "./Person";
import personService from "../../services/persons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import { setSettings } from "../../reducers/settingsReducer";

const Shippers = () => {
  const settings = useSelector((state: IRootState) => state.settings);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);
  const [shippers, setShippers] = useState<PersonProps[]>([]);
  const colors = tokens(settings.mode);
  const isFilterSet = settings.filter !== "";

  useEffect(() => {
    const updateDate = async () => {
      dispatch(setSettings({ ...settings, filter: "" }));
      const allPersons: PersonProps[] = await personService.getAll();
      const allShippers = allPersons.filter(
        (person) => person.role === "Shipper",
      );
      setShippers(allShippers);
    };
    updateDate();
  }, []);

  const linkStyle = {
    color: colors.greenAccent[300],
  };

  const columns: GridColDef<(typeof shippers)[number]>[] = [
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
    },
    {
      field: "surname",
      headerName: "Surname",
    },
    {
      field: "patronymic",
      headerName: "Patronymic",
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
    },
    {
      field: "phoneNumber",
      headerName: "PhoneNumber",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
  ];

  const handleOnSwitchChange = () => {
    setShowAll((prev) => !prev);
  };

  const isCanBeFiltered = (person: PersonProps): boolean => {
    return (
      person.id.toLowerCase().includes(settings.filter.toLowerCase()) ||
      person.phoneNumber
        .toLowerCase()
        .includes(settings.filter.toLowerCase()) ||
      person.email.toLowerCase().includes(settings.filter.toLowerCase()) ||
      person.birthDate.toLowerCase().includes(settings.filter.toLowerCase()) ||
      person.name.toLowerCase().includes(settings.filter.toLowerCase()) ||
      person.surname.toLowerCase().includes(settings.filter.toLowerCase()) ||
      person.patronymic.toLowerCase().includes(settings.filter.toLowerCase())
    );
  };

  const actualShippers = showAll
    ? shippers
    : shippers.filter((shipper) => shipper.isConfirmed !== true);

  return (
    <Box m="20px">
      <Header title={intl.formatMessage({ id: "shippers" }).toUpperCase()} />
      <FormControl checked={showAll} onChange={handleOnSwitchChange} />
      <DataGrid
        rows={
          isFilterSet
            ? actualShippers.filter((shipper) => isCanBeFiltered(shipper))
            : actualShippers
        }
        columns={columns}
      />
    </Box>
  );
};

export default Shippers;
