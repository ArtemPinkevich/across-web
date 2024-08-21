import { Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthMutation } from "../../store/rtkQuery/authApi";
import { AuthRequest, AuthResponce } from "../../models/authModel";
import { LocalStorageKeys, saveInLocalStorage } from "../../services/LocalStorageService";
import { setIsLogined } from "../../store/slices/authSlice";

const SignInTab = () => {
	const dispatch = useDispatch();
	const [fetchAuth, { isLoading, error }] = useAuthMutation();

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = async () => {
		const authArgs: AuthRequest = {
			login,
			password,
		};

		const responce: AuthResponce = await fetchAuth(authArgs).unwrap();

		if (responce?.accessToken) {
			await saveInLocalStorage(LocalStorageKeys.accessToken, responce.accessToken);
			dispatch(setIsLogined(true));
		}
	};

	return (
		<Box m={10} maxWidth={500}>
			<Paper elevation={3} sx={{ m: 3, p: 3 }}>
				<Typography variant="h3" color={"GrayText"} fontFamily={"monospace"}>
					Вход
				</Typography>
				<TextField
					required
					autoFocus
					fullWidth
					margin="normal"
					variant="outlined"
					value={login}
					placeholder="Логин"
					inputProps={{ maxLength: 200 }}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<TextField
					required
					type="password"
					fullWidth
					margin="normal"
					variant="outlined"
					placeholder="Пароль"
					value={password}
					inputProps={{ maxLength: 200 }}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Box mt={2}>
					{isLoading ? (
						<CircularProgress />
					) : (
						<Button disabled={!login || !password} fullWidth variant="contained" onClick={handleClick} size="large">
							Войти
						</Button>
					)}
				</Box>
				{error && <Typography color={"red"}>Неверный логин или пароль</Typography>}
			</Paper>
		</Box>
	);
};

export default SignInTab;
