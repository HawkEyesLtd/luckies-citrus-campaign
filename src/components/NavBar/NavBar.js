/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import 'react-multi-date-picker/styles/colors/yellow.css';
// import logo from '../../assets/logo.png';
import logo from '../../assets/ui/SVG/Logo.svg';
import './nav.css';

function NavBar() {
    return (
        <>
            <div className="nav-container">
                <div className="background-overlay" />
                <div className="nav-content">
                    <div className="content-wrapper">
                        <img src={logo} alt="logo" width="200px" />
                        <h1 className="dashboard-heading">Market Lenz Dashboard</h1>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#020202' }} />
        </>
    );
}

export default NavBar;
