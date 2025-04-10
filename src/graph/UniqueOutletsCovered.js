import React from 'react';
import Chart from 'react-google-charts';
import { PuffLoader } from 'react-spinners';
import './graph.css';

function UniqueOutletsCovered({ data }) {
    if (!data) return null;
    const data2 = [
        ['Unique Outlets', 'Covered', 'Uncovered'],
        ...data.map(({ from, covered, uncovered }) => [from, covered, uncovered]),
    ];
    // const data = [
    //     ['Unique Outlets', 'Covered', 'Uncovered'],
    //     ['Chittagong', 612, 462],
    //     ['Dhaka', 202, 235],
    //     ['Khulna', 843, 82],
    //     ['Rajshahi', 30, 54],
    //     ['Sylhet', 398, 100],
    // ];
    return (
        <div>
            {data.length > 0 && (
                <Chart
                    width="100%"
                    height="200px"
                    chartType="ColumnChart"
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
                            <PuffLoader color="#03A28F" loading size={60} />
                        </div>
                    }
                    data={data2}
                    options={{
                        backgroundColor: {
                            fill: 'transparent',
                        },
                        displayAnnotations: true,
                        hAxis: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 11,
                                fontFamily: 'Roboto',
                            },
                        },
                        vAxis: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 14,
                                fontFamily: 'Roboto',
                            },
                            baselineColor: '#00A68A',
                            gridlineColor: '#00A68A',
                        },
                        isStacked: 'percent',
                        legend: 'none',
                        colors: ['#00A68A', '#227CBF'],
                        tooltip: {
                            showColorCode: true,
                        },
                        chartArea: { left: 70, top: 20, bottom: 30, right: 10, width: '100%' },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            )}
        </div>
    );
}

export default UniqueOutletsCovered;
