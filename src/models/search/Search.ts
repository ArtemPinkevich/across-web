import { ApiCommonResult } from "../commonApi";
import { ITransportation } from "../orders/orderModels";
import { ITruck } from "../truck/truck";

export interface SearchRequest {
	fromAddress: string;
	toAddress: string;
	loadingDate: string; // Строка формата ISO 8601: moment().toISOString(true)
}

export interface SearchResponse {
	result: ApiCommonResult;
	reasons: string[];
	transportationOrders: ITransportation[];
}

export interface SearchTrucksResponse {
	result: ApiCommonResult;
	reasons: string[];
	trucks: ITruck[];
}
