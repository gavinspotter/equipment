import React from 'react'



const EmployeeCompanyHeaderItem = (props) => {
    return (
        <div>
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
