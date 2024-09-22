import { ICargo } from "../cargo/ICargo";
import { ApiCommonResult } from "../commonApi";
import { IProfile } from "../persons/personModels";
import { IPlace } from "../places/Places";
import { ITruck } from "../truck/truck";
import { TransportationStatus } from "./TransportationStatus";

export interface BidsResponse {
	result: ApiCommonResult;
	reasons: string[];
	correlations: ICorrelation[];
}

export interface OrdersInProgressResponse {
	result: ApiCommonResult;
	reasons: string[];
	ordersInProgress: ICorrelation[];
}

export interface ICorrelation {
	shipper: IProfile;
	driver: IProfile;
	truck: ITruck;
	transportationOrder: ITransportation;
}

export interface ITransportation {
	transportationOrderId?: number;
	transferInfo: ITransferInfo;
	cargo: ICargo;
	transportationOrderStatus: TransportationStatus;
	price: number;
}

export interface ITransferInfo {
	loadingDateFrom: string;
	loadingDateTo: string;
	loadingPlace: IPlace;
	loadingAddress: string;
	unloadingPlace: IPlace;
	unloadingAddress: string;
}

export interface IClarifiableTransferInfo {
	loadingTime: string;
	loadingContactPerson: string;
	loadingContactPhone: string;
	unloadingContactPerson: string;
	unloadingContactPhone: string;
}

export interface ITransportationResult {
	result: TransportationOrderResult;
	transportationOrderDtos: ITransportation[];
}

export interface TransportationOrderResult {
	transportationId?: number;
	result: ApiCommonResult;
	reasons: string[];
}

export interface IAssignTruckRequest {
	truckId?: number;
	transportationOrderId?: number;
}

export interface IStartShipperApprovingRequest {
	truckId?: number;
	transportationOrderId?: number;
}

export interface IClarifyRequest extends IClarifiableTransferInfo {
	transportationOrderId: number;
}
