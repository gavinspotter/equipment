import React from "react"

const Input = (props) => {

    const element = props.element === "input" ? (
        <input

            ref={props.valRef}
            type={props.type}
            defaultValue={props.dv}
            value={props.val}

        />
    ) : (
            <textarea
                rows={props.rows || 3}
                ref={props.valRef}
                name={props.name}
                value={props.val}
            />
        )

    return (
        <div>
            <label>
                {props.label}
            </label> <br />
            {element}

        </div>
    )
}

export default Input