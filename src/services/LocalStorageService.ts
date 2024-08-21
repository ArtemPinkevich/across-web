export enum LocalStorageKeys {
	accessToken = "accessToken",
}

export const saveInLocalStorage = async (key: LocalStorageKeys, value: string): Promise<void> => {
	try {
		await localStorage.setItem(key, value);
	} catch (error) {
		console.error("Error saving in LocalStorage", error);
	}
};

export const getFromLocalStorage = async (key: LocalStorageKeys): Promise<string | null> => {
	try {
		return await localStorage.getItem(key);
	} catch (error) {
		console.error("Error retrieving from LocalStorage", error);
		return null;
	}
};

export const removeFromLocalStorage = async (key: LocalStorageKeys): Promise<void> => {
	try {
		return await localStorage.removeItem(key);
	} catch (error) {
		console.error("Error removing from LocalStorage", error);
	}
};
