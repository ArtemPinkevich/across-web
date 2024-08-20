export enum ApiCommonResult {
	Ok,
	Error,
}

export interface DefaultResponse {
	result: ApiCommonResult;
	reasons: string[];
}
