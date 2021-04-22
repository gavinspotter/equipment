import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import CompanyLogin from './companys/CompanyLogin';
import CompanyHome from './companys/pages/CompanyHome';

import { AuthContext } from "./shared/context/auth-context"
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {



  const { token, login, logout, userId, companyToken, companyLogin, companyLogout, companyId } = useAuth();


  let routes

  if (token) {



  } else if (companyToken) {
    routes = (
      <Switch>
        <Route path="/company/home">
          <CompanyHome />
        </Route>
      </Switch>
    )

  } else {
    routes = (
      <Switch>
        <Route path="/company/login">
          <CompanyLogin />
        </Route>
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout, companyIsLoggedIn: !!companyToken, companyToken: companyToken, companyId: companyId, companyLogin: companyLogin, companyLogout: companyLogout }}
    >

      <Router>
        {routes}
      </Router>

    </AuthContext.Provider>

  )
}


export default App

