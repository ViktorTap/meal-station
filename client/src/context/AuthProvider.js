import { createContext } from "react";
// This is the benefit of React context – we can bypass using props entirely and therefore avoid the issue of props drilling.
import { useLocalStorage } from "../hooks/useStorage";
const AuthContext = createContext({});

// Context Provider and Context Consumer

export const AuthProvider = ({ children }) => {
  // const [auth, setAuth] = useState({});

  const [value, setValue, remove] = useLocalStorage("user", null);

  return (
    <AuthContext.Provider
      value={{ auth: value || {}, setAuth: setValue, remove }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
