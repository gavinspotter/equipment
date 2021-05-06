import React, { useContext, useEffect } from 'react'

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"

import "../../css/style.css"

const EmployeeCompanysItem = (props) => {




    return (
        <div
            className="card__employee--company"
        >
            <div className="card__employee--company-text">
                {props.company}
            </div>
        </div>
    )
}

export default EmployeeCompanysItem
