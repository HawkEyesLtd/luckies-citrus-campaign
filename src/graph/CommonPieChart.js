import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import { PuffLoader } from 'react-spinners';
import './graph.css';

function CommonPieChart({
    val,
    totalWithTitle,
    positive,
    negative,
    posValueText,
    negValueText,
    posP,
    negP,
}) {
    const data = [
        ['Status', 'Value'],
        [posValueText, Number(positive)],
        [negValueText, Number(Math.abs(negative))],
    ];

    return (
        <Row>
            <Col md={5} lg={5} sm={5} xs={5} xl={5}>
                <Chart
                    width="100%"
                    height="200px"
                    chartType="PieChart"
                    loader={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <PuffLoader color="#00447A" loading size={60} />
                        </div>
                    }
                    data={data}
                    options={{
                        pieHole: 0.8,
                        backgroundColor: 'transparent',
                        legend: 'none',
                        tooltip: {
                            showColorCode: true,
                            backgroundColor: 'black',
                        },
                        pieSliceBordercolor: '#3DCBF8',
                        slices: [
                            {
                                color: '#00447A',
                            },
                            {
                                color: '#3DCBF8',
                            },
                        ],
                        border: 'none',
                        is3D: false,
                        pieSliceText: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </Col>
            <Col md={7} lg={7} sm={7} xs={7} xl={7}>
                <div className="pie-content-container">
                    <div>
                        <div className="total-value">
                            <p>
                                {val
                                    ? Number(val).toLocaleString() + totalWithTitle
                                    : totalWithTitle}
                            </p>
                        </div>
                        <div className="pie-content">
                            <div className="right-hr-positive" />
                            <div>
                                <p className="single-value">{Number(positive).toLocaleString()}</p>
                                <p className="value-text">{posValueText}</p>
                                <p className="value-percent">{posP}%</p>
                            </div>

                            <div className="right-hr-negative" />
                            <div>
                                <p className="single-value">{Number(negative).toLocaleString()}</p>
                                <p className="value-text">{negValueText}</p>
                                <p className="value-percent">{negP}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default CommonPieChart;
