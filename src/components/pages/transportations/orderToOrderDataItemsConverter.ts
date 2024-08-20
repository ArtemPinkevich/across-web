import { ICargo } from "../../../models/cargo/ICargo";
import { PackagingType } from "../../../models/cargo/PackagingType";
import { PACKAGING_TYPE_DISPLAY_NAME_MAP } from "../../../models/cargo/PackagingTypeToDisplayNameMap";
import { IProfile } from "../../../models/persons/personModels";
import { personStatusToDisplayStringConverter } from "../../../models/persons/personStatusConverter";
import { CARBODY_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../../models/truck/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { ITruck } from "../../../models/truck/truck";

export type OrderDataItems = {
	parameterName: string;
	shipperParameter: string;
	driverParameter: string;
};

export const orderToOrderDataItemsConverter = (
	cargo: ICargo,
	shipper?: IProfile,
	driver?: IProfile,
	truck?: ITruck,
): OrderDataItems[] => {
	const items: OrderDataItems[] = [];

	if (!cargo) return items;

	items.push(
		{
			parameterName: "ФИО",
			shipperParameter: shipper ? `${shipper.surname} ${shipper.name} ${shipper.patronymic}` : "—",
			driverParameter: driver ? `${driver.surname} ${driver.name} ${driver.patronymic}` : "—",
		},
		{
			parameterName: "Телефон",
			shipperParameter: shipper?.phoneNumber ?? "—",
			driverParameter: driver?.phoneNumber ?? "—",
		},
		{
			parameterName: "Статус пользователя",
			shipperParameter: personStatusToDisplayStringConverter(shipper?.status),
			driverParameter: personStatusToDisplayStringConverter(driver?.status),
		},
		{
			parameterName: "Вес / Грузоподъемность, т",
			shipperParameter: `${cargo.weight}`,
			driverParameter: `${truck?.carryingCapacity ?? ""}`,
		},
		{
			parameterName: "Объем, м³",
			shipperParameter: `${cargo.volume}`,
			driverParameter: `${truck?.bodyVolume ?? ""}`,
		},
		{
			parameterName: "Кузов",
			shipperParameter: `${cargo.truckRequirements.carBodies.map((o) => CARBODY_DISPLAY_NAME_MAP.get(o)).join(", ")}`,
			driverParameter: `${truck?.carBodyType ? CARBODY_DISPLAY_NAME_MAP.get(truck.carBodyType) : ""}`,
		},
		{
			parameterName: "Тип загрузки",
			shipperParameter: `${cargo.truckRequirements.loadingTypeDtos.map((o) => ` ${LOADING_TYPE_DISPLAY_NAME_MAP.get(o)}`)}`,
			driverParameter: `${truck?.loadingType ? truck.loadingType.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o)).join(", ") : ""}`,
		},
		{
			parameterName: "Тип выгрузки",
			shipperParameter: `${cargo.truckRequirements.unloadingTypeDtos.map((o) => ` ${LOADING_TYPE_DISPLAY_NAME_MAP.get(o)}`)}`,
			driverParameter: `${truck?.loadingType ? truck.loadingType.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o)).join(", ") : ""}`,
		},
		{
			parameterName: "Упаковка",
			shipperParameter: `${PACKAGING_TYPE_DISPLAY_NAME_MAP.get(cargo.packagingType)}${cargo.packagingType !== PackagingType.inBulk && cargo.packagingType !== PackagingType.loose && cargo.packagingType !== PackagingType.none ? " (" + cargo.packagingQuantity + " шт)" : ""}`,
			driverParameter: "—",
		},
		{
			parameterName: "Длина",
			shipperParameter: `${cargo.length}`,
			driverParameter: `${truck?.innerBodyLength ?? ""}`,
		},
		{
			parameterName: "Ширина",
			shipperParameter: `${cargo.width}`,
			driverParameter: `${truck?.innerBodyWidth ?? ""}`,
		},
		{
			parameterName: "Высота",
			shipperParameter: `${cargo.height}`,
			driverParameter: `${truck?.innerBodyHeight ?? ""}`,
		},
		{
			parameterName: "Диаметр",
			shipperParameter: `${cargo.diameter ?? "—"}`,
			driverParameter: "—",
		},
		{
			parameterName: "Догруз",
			shipperParameter: `${cargo.truckRequirements.hasLtl ? "Да" : "—"}`,
			driverParameter: `${truck?.hasLtl ? "Да" : "—"}`,
		},
		{
			parameterName: "Гидролифт",
			shipperParameter: `${cargo.truckRequirements.hasLiftgate ? "Да" : "—"}`,
			driverParameter: `${truck?.hasLiftgate ? "Да" : "—"}`,
		},
		{
			parameterName: "Коники",
			shipperParameter: `${cargo.truckRequirements.hasStanchionTrailer ? "Да" : "—"}`,
			driverParameter: `${truck?.hasStanchionTrailer ? "Да" : "—"}`,
		},
		{
			parameterName: "TIR",
			shipperParameter: `${cargo.truckRequirements.tir ? "Да" : "—"}`,
			driverParameter: `${truck?.tir ? "Да" : "—"}`,
		},
		{
			parameterName: "EKMT",
			shipperParameter: `${cargo.truckRequirements.ekmt ? "Да" : "—"}`,
			driverParameter: `${truck?.ekmt ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-1, Взрывчатые материалы",
			shipperParameter: `${cargo.truckRequirements.adr1 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr1 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-2, Сжатые газы",
			shipperParameter: `${cargo.truckRequirements.adr2 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr2 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-3, Легковоспламен. жидкости",
			shipperParameter: `${cargo.truckRequirements.adr3 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr3 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-4, Легковоспламен. вещества",
			shipperParameter: `${cargo.truckRequirements.adr4 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr4 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-5, Окисляющиеся вещества",
			shipperParameter: `${cargo.truckRequirements.adr5 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr5 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-6, Ядовитые вещества",
			shipperParameter: `${cargo.truckRequirements.adr6 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr6 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-7, Радиоактивные вещества",
			shipperParameter: `${cargo.truckRequirements.adr7 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr7 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-8, Едкие вещества",
			shipperParameter: `${cargo.truckRequirements.adr8 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr8 ? "Да" : "—"}`,
		},
		{
			parameterName: "ADR-9, Вещества с низкой опасностью",
			shipperParameter: `${cargo.truckRequirements.adr9 ? "Да" : "—"}`,
			driverParameter: `${truck?.adr9 ? "Да" : "—"}`,
		},
	);

	return items;
};
