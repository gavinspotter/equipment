import React from 'react'

import "../../css/style.css"
import CompanyLogin from '../../companys/CompanyLogin'
import CompanySignup from '../../companys/CompanySignup'
import EmployeeLogin from "../../employees/EmployeeLogin"
import EmployeeSignup from "../../employees/EmployeeSignup"

import "../../css/style.css"
import topo from "../../img/topo.gif"

const HomePage = () => {
    return (

        <div>
            <img src={topo} alt="home" className="home" />
            <h1> Track your companys equipment</h1>
            <h2> Add employee's, create equipment, and save the dates!</h2>
            <CompanyLogin
                companyLoginCard="card__company--login"
                companyLoginCardText="card__company--login-text"
            />
            <div className="homepage-margin">margin</div>
            <CompanySignup
                companySignupCard="card__company--signup"

            />
            <EmployeeLogin />
            <EmployeeSignup />

        </div>


    )
}

export default HomePage

