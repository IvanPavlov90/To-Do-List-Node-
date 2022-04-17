import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const login = useCallback(async (token, username) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        username: username,
      })
    );
  }, []);

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));

    if (data && data.token) {
      login(data.token, data.username)
    }
  }, [login]);

  return { token, username, login, logout };
}
