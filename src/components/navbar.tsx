import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const navBarTitle: string = "📈 SF5 Ranked Grind to Diamond 📉";
    const visualizationName: string = "Visualizations";
    const dataLinkName: string = "Dataset and Tech";
    const aboutName: string = "About";

    return (
        <div className='container'>
            <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'>
                <Link to='/' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none'>
                    <span className='fs-4'>{navBarTitle}</span>
                </Link>
                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to="/" className="nav-link">{visualizationName}</Link></li>
                    <li className="nav-item"><Link to="/dataset" className="nav-link">{dataLinkName}</Link></li>
                    <li className="nav-item"><Link to="/about" className="nav-link">{aboutName}</Link></li>
                </ul>
            </header>
        </div>
    );
}

export default NavBar;