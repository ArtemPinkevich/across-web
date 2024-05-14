import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme/theme";
import Header from "../global/Header";
import { useIntl } from "react-intl";
import { useState, useEffect } from "react";
import FormControl from "../global/FormControl";
import { PersonProps } from "./Person";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import { setSettings } from "../../reducers/settingsReducer";
import { useGetPersonsQuery } from "../../services/persons";

const Shippers = () => {
  const settings = useSelector((state: IRootState) => state.settings);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { data } = useGetPersonsQuery();
  const [showAll, setShowAll] = useState(false);
  const colors = tokens(settings.mode);
  const isFilterSet = settings.filter !== "";

  const shippers =
    data !== undefined
      ? data.filter((person) => person.role === "Shipper")
      : [];

  useEffect(() => {
    dispatch(setSettings({ ...settings, filter: "" }));
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
        <Link to={`/shippers/${id.value}`} style={linkStyle}>
          {id.value}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: intl.formatMessage({id: "name"}),
    },
    {
      field: "surname",
      headerName: intl.formatMessage({id: "surname"}),
    },
    {
      field: "patronymic",
      headerName: intl.formatMessage({id: "patronymic"}),
    },
    {
      field: "fullName",
      headerName: intl.formatMessage({id: "fullName"}),      
      sortable: false,
      width: 250,
      valueGetter: (_, row) =>
        `${row.surname || ""} ${row.name || ""} ${row.patronymic || ""}`,
    },
    {
      field: "birthDate",
      headerName: intl.formatMessage({id: "birthDate"}),
      width: 100,
    },
    {
      field: "phoneNumber",
      headerName: intl.formatMessage({id: "phoneNumber"}),
      width: 150,
    },
    {
      field: "email",
      headerName: intl.formatMessage({id: "email"}),
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
