export enum PersonRole {
	NONE = "None",
	DRIVER = "Driver",
	SHIPPER = "Shipper",
	LAWYER = "Lawyer",
	ADMIN = "Admin",
	OWNER = "Owner",
}

export enum PersonStatus {
	NONE = "None",
	DOCUMENTS_MISSING = "DocumentsMissing",
	CONFIRMED = "Approved",
	UNCONFIRMED = "Unapproved",
}

export enum UserDocumentType {
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
	approvementStatus: PersonStatus;
}
