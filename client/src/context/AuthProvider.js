import { createContext, useState } from "react";
// This is the benefit of React context – we can bypass using props entirely and therefore avoid the issue of props drilling.
const AuthContext = createContext({});

// Context Provider and Context Consumer

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
