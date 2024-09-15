import { TransportationStatus } from "./TransportationStatus";

export const TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP = new Map<Object, string>([
	[TransportationStatus.notPublished, "Не опублекованно"],
	[TransportationStatus.carrierFinding, "Поиск перевозчика"],
	[TransportationStatus.managerApproving, "на рассмотрении"],
	[TransportationStatus.shipperApproving, "Согласовании с отправителем"],
	[TransportationStatus.waitingForLoading, "В пути на загрузку"],
	[TransportationStatus.loading, "Загрузка"],
	[TransportationStatus.transporting, "В дороге"],
	[TransportationStatus.unloading, "Выгрузка"],
	[TransportationStatus.delivered, "Доставлено"],
	[TransportationStatus.done, "Завершено"],
]);

export const TRANSPORTATION_STATUS_DISPLAY_NAME_ARRAY = Array.from(
	TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP,
	([value, displayName]) => ({
		value,
		displayName,
	}),
);
