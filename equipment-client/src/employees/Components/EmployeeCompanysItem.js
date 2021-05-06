import React, { useContext, useEffect } from 'react'

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"

import "../../css/style.css"
import { Link } from 'react-router-dom'

const EmployeeCompanysItem = (props) => {




    return (
        <div
            className="card__employee--company"
        >
            <Link to={`/employee/${props._id}`}>
                <div className="card__employee--company-text">
                    {props.company}
                </div>
            </Link>
        </div>
    )
}

export default EmployeeCompanysItem
