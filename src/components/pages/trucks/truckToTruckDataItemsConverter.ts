import { IProfile } from "../../../models/persons/personModels";
import { personStatusToDisplayStringConverter } from "../../../models/persons/personStatusConverter";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { TRAILER_TYPE_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/TrailerTypeToDisplayNameMap";
import { ITruck } from "../../../models/truck/truck";

export type TruckDataItems = {
	parameterName: string;
	value: string;
};

export const truckToTruckDataItemsConverter = (truck: ITruck, driver?: IProfile): TruckDataItems[] => {
	const items: TruckDataItems[] = [];

	if (!truck) return items;

	items.push(
		{
			parameterName: "ФИО",
			value: driver ? `${driver.surname ?? ""} ${driver.name ?? ""} ${driver.patronymic ?? ""}` : "—",
		},
		{
			parameterName: "Телефон",
			value: driver?.phoneNumber ?? "—",
		},
		{
			parameterName: "Статус пользователя",
			value: personStatusToDisplayStringConverter(driver?.status),
		},
		{
			parameterName: "Тип кузова",
			value: `${truck.carBodyType || truck.carBodyType === 0 ? CARBODY_DISPLAY_NAME_MAP.get(truck.carBodyType) : ""}`,
		},
		{
			parameterName: "Тип прицепа",
			value: `${truck.trailerType || truck.trailerType === 0 ? TRAILER_TYPE_DISPLAY_NAME_MAP.get(truck.trailerType) : ""}`,
		},
		{
			parameterName: "Грузоподъемность, т",
			value: `${truck.carryingCapacity ?? ""}`,
		},
		{
			parameterName: "Объем кузова, м³",
			value: `${truck.bodyVolume ?? ""}`,
		},
		{
			parameterName: "Тип загрузки",
			value: `${truck.loadingType ? truck.loadingType.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o)).join(", ") : ""}`,
		},
		{
			parameterName: "Длина кузова",
			value: `${truck.innerBodyLength ?? ""}`,
		},
		{
			parameterName: "Ширина кузова",
			value: `${truck.innerBodyWidth ?? ""}`,
		},
		{
			parameterName: "Высота кузова",
			value: `${truck.innerBodyHeight ?? ""}`,
		},
		{
			parameterName: "Диаметр",
			value: "—",
		},
		{
			parameterName: "Догруз",
			value: `${truck.hasLtl ? "Да" : "—"}`,
		},
		{
			parameterName: "Гидролифт",
			value: `${truck.hasLiftgate ? "Да" : "—"}`,
		},
		{
			parameterName: "Коники",
			value: `${truck.hasStanchionTrailer ? "Да" : "—"}`,
		},
		{
			parameterName: "TIR",
			value: `${truck.tir ? "Да" : "—"}`,
		},
		{
			parameterName: "EKMT",
			value: `${truck.ekmt ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-1, Взрывчатые материалы",
			value: `${truck.adr1 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-2, Сжатые газы",
			value: `${truck.adr2 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-3, Легковоспламен. жидкости",
			value: `${truck.adr3 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-4, Легковоспламен. вещества",
			value: `${truck.adr4 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-5, Окисляющиеся вещества",
			value: `${truck.adr5 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-6, Ядовитые вещества",
			value: `${truck.adr6 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-7, Радиоактивные вещества",
			value: `${truck.adr7 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-8, Едкие вещества",
			value: `${truck.adr8 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-9, Вещества с низкой опасностью",
			value: `${truck.adr9 ? "Да" : "—"}`,
		},
	);

	return items;
};
