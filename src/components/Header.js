import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand ml-4" href="#">Dikshant Rajput</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-5 ">
                        <li className="nav-item active mr-2">
                            <Link to="/" className="nav-link">
                                Characters
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="mailto:dikshatraj2001@gmail.com">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
