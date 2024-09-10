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

export enum UserDocumentType {
	AVATAR,
	PASSPORT_MAIN,
	PASSPORT_REGISTRATION,
	DRIVER_LICENSE,
	TAXPAYER_IDENTIFICATION_NUMBER,
}

export enum UserDocumentStatus {
	NONE,
	VERIFICATION,
	ACCEPTED,
	REJECTED,
}

export interface IUserDocument {
	documentType: UserDocumentType;
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
	documentType: UserDocumentType;
	documentStatus: UserDocumentStatus;
	comment: string;
}

export interface IChangePersonStatusRequest {
	userId: string;
	personStatus: PersonStatus;
	comment: string;
}
