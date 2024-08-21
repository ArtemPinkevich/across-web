import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../models/constants";
import { AuthResponce, AuthRequest } from "../../models/authModel";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		auth: build.mutation<AuthResponce, AuthRequest>({
			query: (body) => ({
				url: "/Authorization/auth",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useAuthMutation } = authApi;
