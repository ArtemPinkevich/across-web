import { ITruckRequirements } from "./ITruckRequirements";
import { PackagingType } from "./PackagingType";

// prettier-ignore
export interface ICargo {
    createdId: string,              // Нужно ли ???
    name: string,                   // Название
    weight: number,                 // Вес, т
    volume: number,                 // Объем, м3
    packagingType: PackagingType,   // Тип упаковки
    packagingQuantity?: number,     // Количество упаковки. НЕ для всех packagingType
     
    // Габариты груза (Д/Ш/В), м; Не должны превышать 50м, не должно быть более 2 знаков после запятой
    length?: number,
    width?: number,
    height?: number,

    diameter?: number,

    truckRequirements: ITruckRequirements
}
