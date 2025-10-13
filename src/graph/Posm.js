import Chart from 'react-google-charts';
import { PuffLoader } from 'react-spinners';
import './graph.css';

function Posm({ usagesData }) {
    const data2 = [
        ['POSM', 'Used', 'Remaining'],
        ...usagesData.map(({ name, count, remaining }) => [name, count, remaining]),
    ];

    return (
        <div>
            {data2.length > 0 && (
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
                            <PuffLoader color="#5b741f" loading size={60} />
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
                                color: '#fff',
                                fontSize: 12,
                                fontFamily: 'Roboto',
                            },
                        },
                        vAxis: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 14,
                                fontFamily: 'Roboto',
                            },
                            baselineColor: '#5b741f',
                            gridlineColor: '#5b741f',
                        },
                        isStacked: 'percent',
                        legend: 'none',
                        colors: ['#5b741f', '#b4da23'],
                        tooltip: {
                            showColorCode: true,
                        },
                        chartArea: { left: 70, top: 20, bottom: 40, right: 10, width: '100%' },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            )}
        </div>
    );
}

export default Posm;
