import { PersonStatus } from "./personModels";

export const personStatusToDisplayStringConverter = (personStatus?: PersonStatus) => {
	switch (personStatus) {
		case PersonStatus.NONE:
			return "Отсутствует";

		case PersonStatus.DOCUMENTS_MISSING:
			return "Отсутствуют документы";

		case PersonStatus.CONFIRMED:
			return "Утвержден";

		case PersonStatus.UNCONFIRMED:
			return "Отклонен";
		default:
			return "";
	}
};
