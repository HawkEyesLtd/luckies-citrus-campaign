/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function Footer() {
    return (
        <div style={{ padding: '0 0 30px 0' }}>
            <p style={{ color: '#ffff', textAlign: 'right' }}>
                *For deeper insights, please visit this link "
                <a
                    target="_blank"
                    href="https://bat.m-lenz.tech/"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    bat.m-lenz.tech
                </a>
                "
            </p>
        </div>
    );
}

export default Footer;
