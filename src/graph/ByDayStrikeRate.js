/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import './graph.css';


  // custom tooltip design
  function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length > 0 && payload[0]?.payload) {
        const tooltipContent = Object.entries(payload[0]?.payload).map((e) => ({
            name: e[0],
            value: e[1],
        }));
        const fontColor = { fontSize: '20px' };
        return (
            <div className="progressTooltipContainer">
                {tooltipContent.map((doc, i) => (
                    <div key={i} className="processTooltip">
                        <p style={i === 0 ? fontColor : null}>
                            {doc.name === 'name' ? null : doc.name}
                            {doc.name === 'name' ? null : ': '}
                            {doc.value}
                            {doc.name === 'name' ? ' Strike Rate' : null}
                            {doc.name === 'name' ? null : '%'}
                        </p>
                    </div>
                ))}
            </div>
        );
    }
    return null;
}
    
function ByDayStrikeRate({strikeRateData}) {

    function normalizeData(rawData) {
        return rawData.map(entry => {
            // eslint-disable-next-line no-underscore-dangle
            const formattedDate = new Date(entry._id).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long'
            });
    
            const normalizedEntry = { name: formattedDate };
    
            entry.data.forEach(region => {
                const percentage = Math.round(((region.completed / region.target) * 100) || 0);
                normalizedEntry[region.from] = parseFloat(percentage); // Convert to number for easier use later
            });
    
            return normalizedEntry;
        });
    }

    const data = normalizeData(strikeRateData)
    const data2 = data && Object.keys(data[0])?.slice(1)    



    // const data = [
    //     {
    //         name: '1-July',
    //         Dhaka: 80,
    //         Rajshahi: 60,
    //         Chittagong: 75,
    //         Khulna: 90,
    //         Sylhet: 50,
    //     },
    //     {
    //         name: '2-July',
    //         Dhaka: 90,
    //         Rajshahi: 50,
    //         Chittagong: 85,
    //         Khulna: 70,
    //         Sylhet: 80,
    //     },
    //     {
    //         name: '3-July',
    //         Dhaka: 60,
    //         Rajshahi: 80,
    //         Chittagong: 85,
    //         Khulna: 60,
    //         Sylhet: 70,
    //     },
    //     {
    //         name: '4-July',
    //         Dhaka: 80,
    //         Rajshahi: 60,
    //         Chittagong: 75,
    //         Khulna: 90,
    //         Sylhet: 50,
    //     },
    //     {
    //         name: '5-July',
    //         Dhaka: 85,
    //         Rajshahi: 90,
    //         Chittagong: 80,
    //         Khulna: 70,
    //         Sylhet: 60,
    //     },
    //     {
    //         name: '6-July',
    //         Dhaka: 70,
    //         Rajshahi: 80,
    //         Chittagong: 55,
    //         Khulna: 90,
    //         Sylhet: 65,
    //     },
    //     {
    //         name: '7-July',
    //         Dhaka: 80,
    //         Rajshahi: 60,
    //         Chittagong: 75,
    //         Khulna: 90,
    //         Sylhet: 50,
    //     },
    //     {
    //         name: '8-July',
    //         Dhaka: 90,
    //         Rajshahi: 75,
    //         Chittagong: 60,
    //         Khulna: 80,
    //         Sylhet: 60,
    //     },
    //     {
    //         name: '9-July',
    //         Dhaka: 80,
    //         Rajshahi: 60,
    //         Chittagong: 75,
    //         Khulna: 90,
    //         Sylhet: 50,
    //     },
    //     {
    //         name: '10-July',
    //         Dhaka: 85,
    //         Rajshahi: 65,
    //         Chittagong: 80,
    //         Khulna: 85,
    //         Sylhet: 70,
    //     },
    //     {
    //         name: '11-July',
    //         Dhaka: 75,
    //         Rajshahi: 85,
    //         Chittagong: 80,
    //         Khulna: 70,
    //         Sylhet: 75,
    //     },
    //     {
    //         name: '12-July',
    //         Dhaka: 90,
    //         Rajshahi: 80,
    //         Chittagong: 70,
    //         Khulna: 85,
    //         Sylhet: 75,
    //     },
    //     {
    //         name: '13-July',
    //         Dhaka: 75,
    //         Rajshahi: 85,
    //         Chittagong: 75,
    //         Khulna: 80,
    //         Sylhet: 75,
    //     },
    //     {
    //         name: '14-July',
    //         Dhaka: 85,
    //         Rajshahi: 65,
    //         Chittagong: 80,
    //         Khulna: 85,
    //         Sylhet: 70,
    //     },
    //     {
    //         name: '15-July',
    //         Dhaka: 90,
    //         Rajshahi: 80,
    //         Chittagong: 85,
    //         Khulna: 75,
    //         Sylhet: 65,
    //     },
    //     {
    //         name: '16-July',
    //         Dhaka: 85,
    //         Rajshahi: 85,
    //         Chittagong: 80,
    //         Khulna: 85,
    //         Sylhet: 70,
    //     },
    // ];

    const colors = [
    '#00A68A',
    '#03A28F',
    '#089D97',
    '#0D96A1',
    '#1290A9',
    '#1888B4',
    '#227CBF',
    '#2E73B1',
    '#63A0D6',
    '#fff',
    '#00A68A',
    '#00B8F1',
    '#00A68A',
    '#03A28F',
    '#089D97',
    '#0D96A1',
    '#1290A9',
    '#1888B4',
    '#227CBF',
    '#2E73B1',
    '#63A0D6',
    '#fff',
    '#00A68A',
    '#00B8F1',
    '#00A68A',
    '#03A28F',
    '#089D97',
    '#0D96A1',
    '#1290A9',
    '#1888B4',
    '#227CBF',
    '#2E73B1',
    '#63A0D6',
    '#fff',
    '#00A68A',
    '#00B8F1',
    '#00A68A',
    '#03A28F',
    '#089D97',
    '#0D96A1',
    '#1290A9',
    '#1888B4',
    '#227CBF',
    '#2E73B1',
    '#63A0D6',
    '#fff',
    '#00A68A',
    '#00B8F1',
    '#00A68A',
    '#03A28F',
    '#089D97',
    '#0D96A1',
    '#1290A9',
    '#1888B4',
    '#227CBF',
    '#2E73B1',
    '#63A0D6',
    '#fff',
    '#00A68A',
    '#00B8F1',
    '#00A68A',
    '#03A28F',
    '#089D97',
    '#0D96A1',
    '#1290A9',
    '#1888B4',
    '#227CBF',
    '#2E73B1',
    '#63A0D6',
    '#fff',
    '#00A68A',
    '#00B8F1',
]

    const [opacity, setOpacity] = useState({ value: 1, });
      const handleMouseEnter = (o) => {
        const { value } = o;
        setOpacity({[value]: 0.5 });
      };
      const handleMouseLeave = () => {
        setOpacity({value: 1 });
      };


    return (
        <div style={{ height: '100%', width: '100%' }}>
            <ResponsiveContainer  width="100%" height={215} aspect={0}>
                <LineChart
                    width={500}
                    height={200}
                    data={data}
                    margin={{
                        top: 25,
                        right: 15,
                        left: 10,
                        bottom: 30,
                    }}
                >
                    <XAxis dataKey="name"  tick={{ fill: '#fff', fontSize: 10 }} />
                    <YAxis
                        tickCount={3}
                        domain={[50, 100]}
                        tick={{ fill: '#fff' }}
                        tickFormatter={(number) => `${number}%`}
                        axisLine={{stroke:"#fff", strokeWidth:0.3}}
                        
                    />
                    <Tooltip wrapperStyle={{zIndex: 1000}} content={<CustomTooltip />}/>
                    <Legend
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        iconSize={14}
                        layout="horizontal"
                        verticalAlign = "bottom"
                        wrapperStyle={{ fontSize: '14px',}}
                        payload={Object.keys(data[0]).slice(1).map((item, index) => ({
                            id: item,
                            type: 'square',
                            value: `${item}`,
                            color: colors[index % colors.length],
                        }))}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        formatter={(value) => <span style={{ color: '#227CBF' }}>{value}</span>}

                    />
                    <CartesianGrid stroke="#fff" strokeWidth={0.3} />
                    {data2 && data2.map((f,i) => (
                        <Line
                            type="monotone"
                            dataKey={f}
                            strokeOpacity={1}
                            strokeWidth={opacity[f] ? '4' : '2'}
                            stroke={colors[((i) % colors.length)]}
                            dot={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ByDayStrikeRate;
