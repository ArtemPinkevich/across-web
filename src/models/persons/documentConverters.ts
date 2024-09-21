import { UserDocumentStatus, UserContentType } from "./personModels";

export const documentTypeToDisplayStringConverter = (documentType?: UserContentType) => {
	switch (documentType) {
		case UserContentType.PASSPORT_MAIN:
			return "Паспорт (главная)";

		case UserContentType.PASSPORT_REGISTRATION:
			return "Паспорт (регистрация)";

		case UserContentType.DRIVER_LICENSE:
			return "Водительское удостоверение";

		case UserContentType.TAXPAYER_IDENTIFICATION_NUMBER:
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
