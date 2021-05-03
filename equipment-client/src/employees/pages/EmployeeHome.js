import React, { useContext } from 'react'

import { AuthContext } from "../../shared/context/auth-context"

import "../../css/style.css"


const EmployeeHome = () => {


    const auth = useContext(AuthContext)


    return (
        <div>
            <img />
            <button onClick={auth.logout}>employee logout</button>
        </div>
    )
}

export default EmployeeHome
