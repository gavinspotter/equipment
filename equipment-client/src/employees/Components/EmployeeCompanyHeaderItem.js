import React from 'react'

import "../../css/style.css"

const EmployeeCompanyHeaderItem = (props) => {
    return (
        <div className="card__employee--e">
            <div>
                {props.name}
            </div>

            <div>
                {props.email}
            </div>
            <br />
        </div>
    )
}

export default EmployeeCompanyHeaderItem
