import { createContext, useContext, useState } from "react";

const StateContext = createContext({
	currentUser: null,
	user: null,
	token: null,
	userId: null,
	setUser: () => {},
	setUserId: () => {},
	setToken: () => {},
});

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [userId, _setUserId] = useState(
		localStorage.getItem("USER_ID"),
	);
	const [token, _setToken] = useState(
		localStorage.getItem("ACCESS_TOKEN"),
	);

	const setToken = (token) => {
		_setToken(token);
		if (token) {
			localStorage.setItem("ACCESS_TOKEN", token);
		} else {
			localStorage.removeItem("ACCESS_TOKEN");
		}
	};

	const setUserId = (id) => {
		_setUserId(id);
		if (id) {
			console.log("ID", id);
			localStorage.setItem("USER_ID", id);
		} else {
			localStorage.removeItem("USER_ID");
		}
	};

	return (
		<StateContext.Provider
			value={{
				userId,
				user,
				token,
				setUser,
				setUserId,
				setToken,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
