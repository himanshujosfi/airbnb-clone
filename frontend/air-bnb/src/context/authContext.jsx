import { createContext } from "react";

export const AuthDataContext = createContext();

function AuthContext({ children }) {
    const url = "http://localhost:8000";

    const value = { url };

    return (
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    );
}

export default AuthContext;
