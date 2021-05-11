import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import CompanyLogin from './companys/CompanyLogin';
import CompanySignup from './companys/CompanySignup';
import CompanyHome from './companys/pages/CompanyHome';
import EmployeeCompany from './employees/pages/EmployeeCompany';
import EmployeeHome from './employees/pages/EmployeeHome';

import { AuthContext } from "./shared/context/auth-context"
import HomePage from './shared/HomePage/HomePage';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {



  const { token, login, logout, userId, companyToken, companyLogin, companyLogout, companyId } = useAuth();


  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/employee/home" exact>
          <EmployeeHome />
        </Route>
        <Route path="/employee/:companyId" exact>
          <EmployeeCompany />
        </Route>
        <Redirect to="/employee/home" />
      </Switch>
    )


  } else if (companyToken) {
    routes = (
      <Switch>
        <Route path="/company/home" exact>
          <CompanyHome />
        </Route>

        <Redirect to="/company/home" exact />
      </Switch>
    )

  } else {
    routes = (
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/company/login">
          <CompanyLogin />
        </Route>
        <Route path="/company/signup">
          <CompanySignup />
        </Route>
        <Redirect to="/" />
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

