/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function Footer() {
    return (
        <div style={{ padding: '0 0 30px 0' }}>
            <div style={{ color: '#000000', textAlign: 'right' }}>
                <p
                    style={{
                        backgroundColor: 'white',
                        display: 'inline-block',
                    }}
                >
                    *For deeper insights, please visit this link "
                    <a
                        target="_blank"
                        href="https://bat.m-lenz.tech/"
                        rel="noreferrer"
                        style={{
                            textDecoration: 'none',

                            fontWeight: '700',
                        }}
                    >
                        bat.m-lenz.tech
                    </a>
                    "
                </p>
            </div>
        </div>
    );
}

export default Footer;
