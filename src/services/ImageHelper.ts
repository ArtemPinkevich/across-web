import axios, { AxiosRequestConfig } from "axios";
import { BASE_SERVER_URL } from "../models/constants";
import { UserContentType } from "../models/persons/personModels";
import { getFromLocalStorage, LocalStorageKeys } from "./LocalStorageService";

export const getUserContentFromBackend = async (
	userContentType: UserContentType,
	userId: string,
	sectionKey?: string,
): Promise<string | undefined> => {
	try {
		const accessToken = await getFromLocalStorage(LocalStorageKeys.accessToken);
		const config: AxiosRequestConfig = {
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}` },
			responseType: "blob",
		};

		const response = await axios.get(
			`${BASE_SERVER_URL}/File/get-user-content?ContentType=${userContentType}&UserId=${userId}&SectionKey=${sectionKey ?? ""}`,
			config,
		);

		if (response.status) {
			const base64 = await convertBlobToBase64(response.data);
			if (base64 && (typeof base64 === "string" || base64 instanceof String)) {
				return base64 as string;
			} else {
				throw new Error("Ошибка при конвертации Blob в Base64");
			}
		} else {
			throw new Error("Ошибка при получении изображения");
		}
	} catch (err) {
		console.error(err);
	}
};

export const convertBlobToBase64 = async (blob: Blob) => {
	const reader = new FileReader();
	const dataPromise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
	});
	reader.readAsDataURL(blob);
	return await dataPromise;
};
