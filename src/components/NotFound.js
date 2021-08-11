import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div 
            className="d-grid justify-content-center align-content-center" 
            style={{"height":"calc(100vh - 96px)","display":"grid","background":"var(--mainColor)"}} 
        >
            <h1 className="display-1 text-white text-center">
                404 
            </h1>
            <h2 className="display-6 text-white">
                Page Not Found
            </h2>
            <Link to="/" className="btn btn-primary bg-blue border-none mt-4">HOME</Link>
        </div>
    )
}

export default NotFound