/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import 'react-multi-date-picker/styles/colors/yellow.css';
import logo from '../../assets/images/logo.png';
import './nav.css';

function NavBar() {
    return (
        <>
            <div className="nav-container">
                <div className="background-overlay" />
                <div className="nav-content">
                    <img src={logo} alt="logo" width="200px" />
                    <div className="content-wrapper">
                        <h1 className="dashboard-heading">Market Lenz Dashboard</h1>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#5a2a0d' }} />
        </>
    );
}

export default NavBar;
