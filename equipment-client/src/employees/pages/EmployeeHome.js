import React, { useContext } from 'react'

import { AuthContext } from "../../shared/context/auth-context"

import "../../css/style.css"
import topohome from "../../img/topohome.gif"
import EmployeeCompanys from '../Components/EmployeeCompanys'


const EmployeeHome = () => {


    const auth = useContext(AuthContext)


    return (
        <div>

            <img src={topohome} alt="equpment_home" className="employeeHome" />
            <EmployeeCompanys />
            <button onClick={auth.logout}>employee logout</button>
        </div>
    )
}

export default EmployeeHome
