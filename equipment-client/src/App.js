import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"

import { AuthContext } from "./shared/context/auth-context"
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {


  const { token, login, logout, userId, companyToken, companyLogin, companyLogout, companyId } = useAuth();


  let routes

  if (token) {

  } else if (companyToken) {

  } else {

  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout, companyIsLoggedIn: !!companyToken, companyToken: companyToken, companyId: companyId, companyLogin: companyLogin, companyLogout: companyLogout }}
    >


    </AuthContext.Provider>

  )
}


export default App

