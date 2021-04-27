import React from 'react'

import "../../css/style.css"
import CompanyLogin from '../../companys/CompanyLogin'
import CompanySignup from '../../companys/CompanySignup'
import EmployeeLogin from "../../employees/EmployeeLogin"
import EmployeeSignup from "../../employees/EmployeeSignup"

import traqimg from "./traquipmenthome.jpg"

const HomePage = () => {
    return (

        <div>
            <img src={traqimg} alt="home" className="home" />
            <CompanyLogin
                companyLoginCard="card__company--login"
                companyLoginCardText="card__company--login-text"
            />
            <CompanySignup
                companySignupCard="card__company--signup"
            />
            <EmployeeLogin />
            <EmployeeSignup />

        </div>


    )
}

export default HomePage

