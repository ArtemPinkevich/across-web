import { ApiCommonResult } from "../commonApi";
import { CarBodyType } from "./CarBodyType";
import { LoadingType } from "./LoadingType";
import { TrailerType } from "./TrailerType";

// Опасные грузы, ADR
export interface IDangerousGoods {
	adr1: boolean;
	adr2: boolean;
	adr3: boolean;
	adr4: boolean;
	adr5: boolean;
	adr6: boolean;
	adr7: boolean;
	adr8: boolean;
	adr9: boolean;
	tir: boolean;
	ekmt: boolean;
}

export interface ITruckBase {
	hasLtl: boolean; // догруз
	hasLiftgate: boolean; // Гидролифт
	hasStanchionTrailer: boolean; // коники
	carryingCapacity: number; // грузоподъемность, т (макс. 9999)
}

// prettier-ignore
export interface ITruck extends IDangerousGoods, ITruckBase {
    truckId?: number,
    createdId: string,  // Нужно ли ???
    regNumber: string,  // Нужно ли ???

    trailerType?: TrailerType,      // Тип прицепа
    carBodyType?: CarBodyType,          // Кузов
    loadingType?: LoadingType[],    // Тип загрузки

    bodyVolume: number,             // объем кузова, m3 (макс. 9999)

    // Внутренние габариты кузова (Д/Ш/В), м; Не должны превышать 50м, не должно быть более 2 знаков после запятой
    innerBodyLength: number,
    innerBodyWidth: number,
    innerBodyHeight: number,
}

export interface ITruckResultDto {
	result: ApiCommonResult;
	reasons: string[];
}

export interface ITrucksListResultDto {
	result: ITruckResultDto;
	trucks: ITruck[];
}
