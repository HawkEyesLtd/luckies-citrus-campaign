import Chart from 'react-google-charts';
import { PuffLoader } from 'react-spinners';
import './graph.css';

function UniqueOutletsCovered({ data }) {
    if (!data) return null;
    const data2 = [
        ['Unique Outlets', 'Covered', 'Uncovered'],
        ...data.map(({ from, covered, uncovered }) => [from, covered, uncovered]),
    ];

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
                            <PuffLoader color="#753b10" loading size={60} />
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
                            baselineColor: '#753b10',
                            gridlineColor: '#753b10',
                        },
                        isStacked: 'percent',
                        legend: 'none',
                        colors: ['#753b10', '#e1801e'],
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
