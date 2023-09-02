import React from "react";

const NavBar = () => {
    const navBarTitle: string = "SF5 Ranked Grind Visualization";
    const visualizationName: string = "Visualizations";
    const dataLinkName: string = "Dataset";
    const aboutName: string = "About";

    return (
        <div className='container'>
            <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'>
                <a href='#' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none'>
                    <span className='fs-4'>{navBarTitle}</span>
                </a>
                <ul className="nav nav-pills">
                    <li className="nav-item"><a href="#" className="nav-link">{visualizationName}</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">{dataLinkName}</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">{aboutName}</a></li>
                </ul>
            </header>
        </div>
    );
}

export default NavBar;