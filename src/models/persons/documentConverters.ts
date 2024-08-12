import { UserDocumentStatus, UserDocumentType } from "./personModels";

export const documentTypeToDisplayStringConverter = (documentType?: UserDocumentType) => {
	switch (documentType) {
		case UserDocumentType.PASSPORT_MAIN:
			return "Паспорт (главная)";

		case UserDocumentType.PASSPORT_REGISTRATION:
			return "Паспорт (регистрация)";

		case UserDocumentType.DRIVER_LICENSE:
			return "Водительское удостоверение";

		case UserDocumentType.TAXPAYER_IDENTIFICATION_NUMBER:
			return "ИНН";
		default:
			return "";
	}
};

export const documentStatusToDisplayStringConverter = (documentStatus?: UserDocumentStatus) => {
	switch (documentStatus) {
		case UserDocumentStatus.NONE:
			return "Отсутствует";

		case UserDocumentStatus.VERIFICATION:
			return "Требует проверки";

		case UserDocumentStatus.ACCEPTED:
			return "Утвержден";

		case UserDocumentStatus.REJECTED:
			return "Отклонен";
		default:
			return "";
	}
};
