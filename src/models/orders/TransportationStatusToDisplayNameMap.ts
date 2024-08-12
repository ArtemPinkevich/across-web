import { TransportationStatus } from "./TransportationStatus";

export const TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP = new Map<Object, string>([
	[TransportationStatus.notPublished, "Не опублекованно"],
	[TransportationStatus.carrierFinding, "Поиск перевозчика"],
	[TransportationStatus.waitingForLoading, "Отгрузка"],
	[TransportationStatus.transporting, "В дороге"],
	[TransportationStatus.delivered, "Доставлено"],
]);

export const TRANSPORTATION_STATUS_DISPLAY_NAME_ARRAY = Array.from(
	TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP,
	([value, displayName]) => ({
		value,
		displayName,
	}),
);
