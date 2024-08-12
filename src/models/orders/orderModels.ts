import { ICargo } from "../cargo/ICargo";
import { ApiCommonResult } from "../commonApi";
import { IProfile } from "../persons/personModels";
import { IPlace } from "../places/Places";
import { TransportationStatus } from "./TransportationStatus";

export interface BidsResponse {
	result: ApiCommonResult;
	reasons: string[];
	correlations: ICorrelation[];
}

export interface ICorrelation {
	shipper: IProfile;
	driver: IProfile;
	transportation: ITransportation;
}

export interface ITransportation {
	transportationOrderId?: number;
	transferInfo: ITransferInfo;
	cargo: ICargo;
	transportationStatus: TransportationStatus;
}

export interface ITransferInfo {
	loadingDateFrom: string; // Строка формата DateOnly, например "30.01.2022"
	loadingDateTo: string;
	// LoadingTimeFrom: string;            // Строка формата TimeOnly, например "08:00"
	// LoadingTimeTo: string;
	loadingPlace: IPlace;
	loadingAddress: string;

	unloadingPlace: IPlace;
	unloadingAddress: string;
	// unloadingDateFrom: string;            // Строка формата DateOnly, например "30.01.2022"
	// unloadingDateTo: string;
	// UnloadingTimeFrom: string;            // Строка формата TimeOnly, например "08:00"
	// UnloadingTimeTo: string;
}
