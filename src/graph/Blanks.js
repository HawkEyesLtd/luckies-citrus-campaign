import React from 'react';
import Chart from 'react-google-charts';
import './graph.css';

function Blanks() {
    const data = [
        ['Blanks', 'Used', 'Remaining'],
        ['BnH SW', 500, 100],
        ['BnH BG', 7414, 92],
        ['BnH FF', 4167, 0],
        ['BnH PT', 130, 54],
        ['JPFF', 398, 100],
        ['JPSPCL', 398, 80],
        ['JPSW', 398, 80],
        ['RoyalsGold', 398, 80],
        ['RoyalsNext', 398, 80],
        ['Derby', 398, 80],
        ['Derby Style', 398, 80],
        ['Pilot', 398, 80],
        ['Hollywood', 398, 80],
        ['LS SB', 398, 80],
        ['LS CC', 398, 80],
    ];
    return (
        <div>
            <Chart
                width="100%"
                height="200px"
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    backgroundColor: {
                        fill: 'transparent',
                    },
                    displayAnnotations: true,
                    hAxis: {
                        textStyle: {
                            color: '#484646',
                            fontSize: 11,
                            fontFamily: 'Roboto',
                        },
                    },
                    vAxis: {
                        textStyle: {
                            color: '#484646',
                            fontSize: 14,
                            fontFamily: 'Roboto',
                        },
                        baselineColor: '#f9f19b',
                        gridlineColor: '#f9f19b',
                    },
                    isStacked: 'percent',
                    legend: 'none',
                    colors: ['#14231c', '#b4da23'],
                    tooltip: {
                        showColorCode: true,
                    },
                    chartArea: { left: 70, top: 20, bottom: 40, right: 10, width: '100%' },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
}

export default Blanks;
