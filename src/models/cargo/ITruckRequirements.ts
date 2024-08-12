import { CarBodyType } from "../truck/CarBodyType";
import { LoadingType } from "../truck/LoadingType";
import { ITruckBase, IDangerousGoods } from "../truck/truck";

export interface ITruckRequirements extends ITruckBase, IDangerousGoods {
	carBodies: CarBodyType[]; // Кузов
	loadingTypeDtos: LoadingType[]; // Тип загрузки
	unloadingTypeDtos: LoadingType[]; // Тип выгрузки
}
