import React from 'react'

const EmployeeCompanyHeaderItem = (props) => {
    return (
        <div>
            <div>
                {props.name}
            </div>
            <br />
            <div>
                {props.email}
            </div>
        </div>
    )
}

export default EmployeeCompanyHeaderItem
