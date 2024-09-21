export enum PersonRole {
	NONE = "None",
	DRIVER = "Driver",
	SHIPPER = "Shipper",
	LAWYER = "Lawyer",
	ADMIN = "Admin",
	OWNER = "Owner",
}

export enum PersonStatus {
	NONE,
	DOCUMENTS_MISSING,
	CONFIRMED,
	UNCONFIRMED,
}

export enum UserContentType {
	AVATAR,
	PASSPORT_MAIN,
	PASSPORT_REGISTRATION,
	DRIVER_LICENSE,
	TAXPAYER_IDENTIFICATION_NUMBER,
	TRUCK_PHOTO_FRONT,
	TRUCK_PHOTO_BACK,
	TRUCK_PHOTO_LEFT,
	TRUCK_PHOTO_RIGHT,
}

export enum UserDocumentStatus {
	NONE,
	VERIFICATION,
	ACCEPTED,
	REJECTED,
}

export interface IUserDocument {
	documentType: UserContentType;
	documentStatus: UserDocumentStatus;
	comment?: string;
}

export interface IProfile {
	id: string;
	name?: string;
	surname?: string;
	patronymic?: string;
	role?: string; // Может принимать только одно из двух значений: Shipper или Driver (см. enum PersonRole)
	birthDate?: string; // Строка ISO
	phoneNumber: string;
	documentDtos: IUserDocument[];
	status: PersonStatus;
}

export interface IChangeDocumentStatusRequest {
	userId: string;
	documentType: UserContentType;
	documentStatus: UserDocumentStatus;
	comment: string;
}

export interface IChangePersonStatusRequest {
	userId: string;
	personStatus: PersonStatus;
	comment: string;
}
