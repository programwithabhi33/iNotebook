import React from 'react'

export default function Alert(props) {
    return (
        <div>
            <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
                <strong>Alert: </strong>{props.message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}
