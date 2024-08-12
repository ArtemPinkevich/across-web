import { PackagingType } from "../PackagingType";

export const PACKAGING_TYPE_DISPLAY_NAME_MAP = new Map<Object, string>([
	[PackagingType.none, "Не указано"],
	[PackagingType.inBulk, "Навалом"],
	[PackagingType.cardboardBoxes, "Коробки"],
	[PackagingType.loose, "Россыпью"],
	[PackagingType.palletized, "Палеты"],
	[PackagingType.inPacks, "Пачки"],
	[PackagingType.bags, "Мешки"],
	[PackagingType.bigBag, "Биг-бэги"],
	[PackagingType.boxes, "Ящики"],
	[PackagingType.listed, "Листы"],
	[PackagingType.barrels, "Бочки"],
	[PackagingType.canister, "Канистры"],
	[PackagingType.rolls, "Рулоны"],
	[PackagingType.pyramida, "Пирамида"],
	[PackagingType.eurocube, "Еврокубы"],
	[PackagingType.coil, "Катушки"],
	[PackagingType.reel, "Барабаны"],
]);

export const PACKAGING_TYPE_DISPLAY_NAME_ARRAY = Array.from(PACKAGING_TYPE_DISPLAY_NAME_MAP, ([value, displayName]) => ({ value, displayName }));
