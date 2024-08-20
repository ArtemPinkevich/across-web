import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { DriverDto, SearchRequest } from "../../models/search/Search";
import { useLazySearchTrucksQuery } from "../../store/rtkQuery/searchApi";
import { Moment } from "moment";
import moment from "moment";
import {
	CARBODY_DISPLAY_NAME_ARRAY,
	CARBODY_DISPLAY_NAME_MAP,
} from "../../models/truck/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { CarBodyType } from "../../models/truck/CarBodyType";
import { LoadingType } from "../../models/truck/LoadingType";
import {
	LOADING_TYPE_DISPLAY_NAME_ARRAY,
	LOADING_TYPE_DISPLAY_NAME_MAP,
} from "../../models/truck/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import TrucksTable from "./trucks/TrucksTable";

export interface ISelectItem {
	value: Object;
	displayName: string;
}

const SearchTruckTab = () => {
	const [trigger, { data: searchResponse }] = useLazySearchTrucksQuery();

	const [loadingPlace, setLoadingPlace] = useState<string>("");
	const [drivers, setDrivers] = useState<DriverDto[]>(searchResponse?.drivers ?? []);
	const [loadingDateFrom, setLoadingDateFrom] = useState<Moment | null>(moment());
	const [isFiltredExpanded, setIsFiltredExpanded] = useState<boolean>(false);
	const [weightMin, setWeightMin] = useState<number>();
	const [weightMax, setWeightMax] = useState<number>();
	const [volumeMin, setVolumeMin] = useState<number>();
	const [volumeMax, setVolumeMax] = useState<number>();
	const [lengthMin, setLengthMin] = useState<number>();
	const [lengthMax, setLengthMax] = useState<number>();
	const [widthMin, setWidthMin] = useState<number>();
	const [widthMax, setWidthMax] = useState<number>();
	const [heightMin, setHeightMin] = useState<number>();
	const [heightMax, setHeightMax] = useState<number>();

	const [hasLtl, setHasLtl] = useState(false);
	const [hasLiftgate, setHasLiftgate] = useState(false);
	const [hasStanchionTrailer, setHasStanchionTrailer] = useState(false);
	const [isDangerous, setIsDangerous] = useState(false);
	const [isTir, setIsTir] = useState(false);
	const [isEkmt, setIsEkmt] = useState(false);
	const [truckBodies, setTruckBodies] = useState<CarBodyType[]>([]);
	const [loadingTypes, setLoadingTypes] = useState<LoadingType[]>([]);

	useEffect(() => {
		applyFiltersHandler();
	}, [hasLtl, hasLiftgate, hasStanchionTrailer, isDangerous, isTir, isEkmt]);

	const handleLoadingTypeChange = (event: SelectChangeEvent<typeof loadingTypes>) => {
		const value = event.target.value;
		if (typeof value !== "string") {
			setLoadingTypes(value);
		}
	};

	const handleTruckBodiesChange = (event: SelectChangeEvent<typeof truckBodies>) => {
		const value = event.target.value;
		if (typeof value !== "string") {
			setTruckBodies(value);
		}
	};

	const resetFiltersHandler = () => {
		setWeightMin(undefined);
		setWeightMax(undefined);
		setVolumeMin(undefined);
		setVolumeMax(undefined);
		setLengthMin(undefined);
		setLengthMax(undefined);
		setWidthMin(undefined);
		setWidthMax(undefined);
		setHeightMin(undefined);
		setHeightMax(undefined);
		setTruckBodies([]);
		setLoadingTypes([]);
		setHasLtl(false);
		setHasLiftgate(false);
		setHasStanchionTrailer(false);
		setIsDangerous(false);
		setIsTir(false);
		setIsEkmt(false);
		setDrivers(searchResponse?.drivers ?? []);
	};

	const applyFiltersHandler = () => {
		if (!searchResponse || searchResponse.drivers?.length === 0) {
			setDrivers([]);
			return;
		}

		let filtredTransportations = searchResponse.drivers.filter((o) => {
			if ((weightMin || weightMax) && !o.truck.carryingCapacity) return;
			if (weightMin && weightMin > o.truck.carryingCapacity) return;
			if (weightMax && weightMax < o.truck.carryingCapacity) return;
			if ((volumeMin || volumeMax) && !o.truck.bodyVolume) return;
			if (volumeMin && volumeMin > o.truck.bodyVolume) return;
			if (volumeMax && volumeMax < o.truck.bodyVolume) return;
			if (!o.truck.innerBodyLength && (lengthMin || lengthMax)) return;
			if (o.truck.innerBodyLength && lengthMin && lengthMin > o.truck.innerBodyLength) return;
			if (o.truck.innerBodyLength && lengthMax && lengthMax < o.truck.innerBodyLength) return;
			if (!o.truck.innerBodyWidth && (widthMin || widthMax)) return;
			if (o.truck.innerBodyWidth && widthMin && widthMin > o.truck.innerBodyWidth) return;
			if (o.truck.innerBodyWidth && widthMax && widthMax < o.truck.innerBodyWidth) return;
			if (!o.truck.innerBodyHeight && (heightMin || heightMax)) return;
			if (o.truck.innerBodyHeight && heightMin && heightMin > o.truck.innerBodyHeight) return;
			if (o.truck.innerBodyHeight && heightMax && heightMax < o.truck.innerBodyHeight) return;
			if (hasLtl && !o.truck.hasLtl) return;
			if (hasLiftgate && !o.truck.hasLiftgate) return;
			if (hasStanchionTrailer && !o.truck.hasStanchionTrailer) return;
			if (isTir && !o.truck.tir) return;
			if (isEkmt && !o.truck.ekmt) return;
			if (
				isDangerous &&
				!o.truck.adr1 &&
				!o.truck.adr2 &&
				!o.truck.adr3 &&
				!o.truck.adr4 &&
				!o.truck.adr5 &&
				!o.truck.adr6 &&
				!o.truck.adr7 &&
				!o.truck.adr8 &&
				!o.truck.adr9
			) {
				return;
			}

			if (truckBodies.length > 0 && !o.truck.carBodyType) return;
			if (
				truckBodies.length > 0 &&
				(o.truck.carBodyType || o.truck.carBodyType === 0) &&
				!truckBodies.includes(o.truck.carBodyType)
			) {
				return;
			}

			if (loadingTypes.length > 0 && !o.truck.loadingType) return;
			if (
				loadingTypes.length > 0 &&
				(o.truck.loadingType || o.truck.loadingType === 0) &&
				loadingTypes.filter((x) => o.truck.loadingType?.includes(x)).length === 0
			) {
				return;
			}

			return true;
		});

		setDrivers(filtredTransportations);
	};

	const searchHandler = async () => {
		if (!loadingPlace) {
			alert("Необходимо указать место отправления");
			return;
		}

		if (!loadingDateFrom) {
			alert("Необходимо указать дату загрузки");
			return;
		}

		const searchRequest: SearchRequest = {
			fromAddress: loadingPlace,
			toAddress: "",
			loadingDate: loadingDateFrom.toISOString(true),
			//loadDate: moment("20240427", "YYYYMMDD").toISOString(true),
		};

		const result = await trigger(searchRequest);
		if (result.isSuccess) {
			setDrivers(result.data?.drivers ?? []);
		}
	};

	return (
		<Box m={2}>
			<Grid container direction={"column"} spacing={2}>
				<Grid container item spacing={2} letterSpacing={1}>
					<Grid item xs={12} sm={4} md={6}>
						<TextField
							fullWidth
							autoComplete="off"
							size="small"
							label="Город загрузки"
							variant="outlined"
							onChange={(o) => setLoadingPlace(o.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={8} md={5} lg={"auto"}>
						<Stack direction={"row"}>
							<DatePicker
								label="Дата загрузки, с"
								slotProps={{
									textField: {
										size: "small",
										fullWidth: true,
									},
								}}
								value={loadingDateFrom}
								onChange={(o) => setLoadingDateFrom(o)}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12} md={1}>
						<Button variant="contained" onClick={searchHandler}>
							Найти
						</Button>
					</Grid>
				</Grid>
			</Grid>

			<Button sx={{ my: 1 }} variant="text" onClick={() => setIsFiltredExpanded(!isFiltredExpanded)}>
				{isFiltredExpanded ? "Скрыть фильтры" : "Показать фильтры"}
			</Button>

			{!isFiltredExpanded ? null : (
				<Grid container direction={"column"} spacing={2} px={4}>
					<Grid container item spacing={2} letterSpacing={1}>
						<Grid item xs={12} sm={6} md={3} lg={4} xl={4}>
							<Stack direction={"row"}>
								<TextField
									fullWidth
									type={"number"}
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Грузоподъемность, от"
									variant="outlined"
									value={weightMin ?? ""}
									onChange={(o) => setWeightMin(+o.target.value)}
								/>
								<Box alignContent={"center"}>
									<Typography>—</Typography>
								</Box>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Грузоподъемность, до"
									variant="outlined"
									value={weightMax ?? ""}
									onChange={(o) => setWeightMax(+o.target.value)}
								/>
							</Stack>
						</Grid>
						<Grid item xs={12} sm={6} md={3} lg={3}>
							<Stack direction={"row"}>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Объем, от"
									variant="outlined"
									value={volumeMin ?? ""}
									onChange={(o) => setVolumeMin(+o.target.value)}
								/>
								<Box alignContent={"center"}>
									<Typography>—</Typography>
								</Box>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Объем, до"
									variant="outlined"
									value={volumeMax ?? ""}
									onChange={(o) => setVolumeMax(+o.target.value)}
								/>
							</Stack>
						</Grid>
					</Grid>

					<Grid container item spacing={2} letterSpacing={1}>
						<Grid item xs={12} sm={4} md={3} lg={2}>
							<Stack direction={"row"}>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Длина, от"
									variant="outlined"
									value={lengthMin ?? ""}
									onChange={(o) => setLengthMin(+o.target.value)}
								/>
								<Box alignContent={"center"}>
									<Typography>—</Typography>
								</Box>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Длина, до"
									variant="outlined"
									value={lengthMax ?? ""}
									onChange={(o) => setLengthMax(+o.target.value)}
								/>
							</Stack>
						</Grid>
						<Grid item xs={12} sm={4} md={3} lg={2}>
							<Stack direction={"row"}>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Ширина, от"
									variant="outlined"
									value={widthMin ?? ""}
									onChange={(o) => setWidthMin(+o.target.value)}
								/>
								<Box alignContent={"center"}>
									<Typography>—</Typography>
								</Box>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Ширина, до"
									variant="outlined"
									value={widthMax ?? ""}
									onChange={(o) => setWidthMax(+o.target.value)}
								/>
							</Stack>
						</Grid>

						<Grid item xs={12} sm={4} md={3} lg={2}>
							<Stack direction={"row"}>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Высота, от"
									variant="outlined"
									value={heightMin ?? ""}
									onChange={(o) => setHeightMin(+o.target.value)}
								/>
								<Box alignContent={"center"}>
									<Typography>—</Typography>
								</Box>
								<TextField
									fullWidth
									type="number"
									inputMode="numeric"
									autoComplete="off"
									size="small"
									label="Высота, до"
									variant="outlined"
									value={heightMax ?? ""}
									onChange={(o) => setHeightMax(+o.target.value)}
								/>
							</Stack>
						</Grid>
					</Grid>

					<Grid container item spacing={2} letterSpacing={1}>
						<Grid item xs={12} sm={4} md={4} lg={4}>
							<FormControl size="small" fullWidth>
								<InputLabel id="demo-multiple-checkbox-label">Тип кузова</InputLabel>
								<Select
									labelId="demo-multiple-name-label"
									fullWidth
									size="small"
									id="demo-multiple-name"
									multiple
									value={truckBodies}
									onChange={handleTruckBodiesChange}
									input={<OutlinedInput label="Тип кузова" />}
									renderValue={(selected) => selected.map((o) => CARBODY_DISPLAY_NAME_MAP.get(o)).join(", ")}
								>
									{CARBODY_DISPLAY_NAME_ARRAY.map((item, index) => (
										<MenuItem key={index} value={item.value as CarBodyType}>
											<Checkbox checked={truckBodies.findIndex((o) => o === item.value) > -1} />
											<ListItemText primary={item.displayName} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4} md={4} lg={4}>
							<FormControl size="small" fullWidth>
								<InputLabel id="demo-multiple-checkbox-label">Тип загрузки</InputLabel>
								<Select
									labelId="demo-multiple-name-label"
									fullWidth
									size="small"
									id="demo-multiple-name"
									multiple
									value={loadingTypes}
									onChange={handleLoadingTypeChange}
									input={<OutlinedInput label="Тип загрузки" />}
									renderValue={(selected) => selected.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o)).join(", ")}
								>
									{LOADING_TYPE_DISPLAY_NAME_ARRAY.map((item, index) => (
										<MenuItem key={index} value={item.value as LoadingType}>
											<Checkbox checked={loadingTypes.findIndex((o) => o === item.value) > -1} />
											<ListItemText primary={item.displayName} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>

					<Grid container item spacing={2}>
						<Grid item xs={4} sm={4} md={2} lg={2}>
							<FormControlLabel
								control={<Switch checked={hasLtl} onChange={(e) => setHasLtl(e.target.checked)} />}
								label="Догруз"
							/>
						</Grid>
						<Grid item xs={4} sm={4} md={2} lg={2}>
							<FormControlLabel
								control={<Switch checked={hasLiftgate} onChange={(e) => setHasLiftgate(e.target.checked)} />}
								label="Гидролифт"
							/>
						</Grid>
						<Grid item xs={4} sm={4} md={2} lg={2}>
							<FormControlLabel
								control={
									<Switch checked={hasStanchionTrailer} onChange={(e) => setHasStanchionTrailer(e.target.checked)} />
								}
								label="Коники"
							/>
						</Grid>
						<Grid item xs={4} sm={4} md={2} lg={2}>
							<FormControlLabel
								control={<Switch checked={isDangerous} onChange={(e) => setIsDangerous(e.target.checked)} />}
								label="Опасный"
							/>
						</Grid>
						<Grid item xs={4} sm={4} md={2} lg={2}>
							<FormControlLabel
								control={<Switch checked={isTir} onChange={(e) => setIsTir(e.target.checked)} />}
								label="TIR"
							/>
						</Grid>
						<Grid item xs={4} sm={4} md={2} lg={2}>
							<FormControlLabel
								control={<Switch checked={isEkmt} onChange={(e) => setIsEkmt(e.target.checked)} />}
								label="EKMT"
							/>
						</Grid>
					</Grid>

					<Grid container item spacing={2}>
						<Grid item>
							<Button variant="contained" onClick={applyFiltersHandler}>
								Применить фильтры
							</Button>
						</Grid>
						<Grid item>
							<Button onClick={resetFiltersHandler}>Сбросить фильтры</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
			<Box my={2}>
				<TrucksTable drivers={drivers} />
			</Box>
		</Box>
	);
};

export default SearchTruckTab;
