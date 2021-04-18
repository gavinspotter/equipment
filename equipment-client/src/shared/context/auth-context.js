import { createContext } from "react"

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => { },
    logout: () => { },
    companyIsLoggedIn: false,
    companyId: null,
    companyToken: null,
    companyLogin: () => { },
    companyLogout: () => { }
})