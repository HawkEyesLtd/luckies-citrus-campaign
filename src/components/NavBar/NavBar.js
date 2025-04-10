/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import 'react-multi-date-picker/styles/colors/yellow.css';
// import logo from '../../assets/logo.png';
import logo from '../../assets/ui/5x/Lucky Strike Logo@5x.png';
import './nav.css';

function NavBar() {
    return (
        <>
            <div className="nav-container">
                <div className="nav-content">
                    <img src={logo} alt="logo" width="180px" />
                    <h1
                        className="dashboard-heading"
                        style={{
                            margin: 0,
                            lineHeight: '1',
                            padding: '40px 0',
                            marginLeft: '140px',
                        }}
                    >
                        <span>Market Lenz</span>
                        <span style={{ display: 'block' }}>DASHBOARD</span>
                    </h1>
                </div>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#020202' }} />
        </>
    );
}

export default NavBar;
