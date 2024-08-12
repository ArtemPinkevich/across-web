import { IPlace } from "./Places";

export const placeToDisplayStringConverter = (placeDto?: IPlace) => {
	if (!placeDto) return "";
	return `${placeDto.city ? placeDto.city + "," : ""} ${placeDto.region ? placeDto.region + "," : ""} ${placeDto.country}`;
};
