import { TrailerType } from "../../truck/TrailerType";

export const TRAILER_TYPE_DISPLAY_NAME_MAP = new Map<Object, string>([
    [TrailerType.Truck, "Грузовик"],
    [TrailerType.Trailer, "Прицеп"],
    [TrailerType.Semitrailer, "Полуприцеп"],
]);

export const TRAILER_TYPE_DISPLAY_NAME_ARRAY = Array.from(TRAILER_TYPE_DISPLAY_NAME_MAP, ([value, displayName]) => ({ value, displayName }));
