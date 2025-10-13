/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import "./graph.css";

// const data = [
//     {
//         name: 'Chittagong',
//         value: 77,
//     },
//     {
//         name: 'Dhaka',
//         value: 60,
//     },
//     {
//         name: 'Khulna',
//         value: 100,
//     },
//     {
//         name: 'Rajshahi',
//         value: 31,
//     },
//     {
//         name: 'Sylhet',
//         value: 67,
//     },
// ];

const colors2 = [
    "#14231c",
    "#26371d",
    "#384c1e",
    "#49601e",
    "#5b741f",
    "#6d8920",
    "#7f9d21",
    "#90b121",
    "#a2c622",
    "#b4da23",
];

function CustomTooltip({ active, payload }) {
    if (active && payload?.length) {
        return (
            <div className="custom-tooltip">
                <h6>{payload[0].payload.name}</h6>
                <p>{payload[0].payload.value}%</p>
            </div>
        );
    }
    return null;
}

const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
        <g>
            <text
                x={x + width / 2}
                y={y - radius}
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {value}%
            </text>
        </g>
    );
};

function percentCalculate(target, completed) {
    return Math.round((completed / target) * 100 || 0);
}

function StrikeRateBreakdown({ data }) {
    const newData = data?.map((x) => ({
        name: x.from,
        value: percentCalculate(x.target, x.completed),
    }));

    const [opacity, setOpacity] = React.useState({
        value: 1,
    });
    const handleMouseEnter = (o) => {
        const { value } = o;
        setOpacity({ ...opacity, [value]: 0.5 });
    };
    const handleMouseLeave = (o) => {
        const { value } = o;
        setOpacity({ ...opacity, [value]: 1 });
    };

    return (
        <div style={{ height: "100%" }}>
            <ResponsiveContainer width="100%" height={235}>
                <BarChart
                    data={newData}
                    margin={{
                        top: 30,
                        right: 20,
                        left: 10,
                        bottom: 50,
                    }}
                >
                    <CartesianGrid stroke="#5b741f" strokeWidth={0.3} />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "#6d8920" }}
                        wrapperStyle={{ outline: "none" }}
                    />
                    <Legend
                        iconSize={14}
                        wrapperStyle={{
                            fontSize: "14px",
                            paddingTop: "10px",
                            color: "#227CBF",
                        }}
                        layout="horizontal"
                        verticalAlign="bottom"
                        payload={newData.map((item, index) => ({
                            id: item.name,
                            type: "square",
                            value: `${item.name}`,
                            color: colors2[index % colors2.length],
                        }))}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        formatter={(value) => (
                            <span style={{ color: "#fff" }}>{value}</span>
                        )}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <YAxis
                        domain={[0, 100]}
                        tick={{ fill: "#fff" }}
                        tickFormatter={(number) => `${number}%`}
                        tickCount={3}
                        axisLine={{ stroke: "#089D97", strokeWidth: 0.3 }}
                    />
                    <Bar
                        dataKey="value"
                        radius={[0, 0, 0, 0]}
                        fillOpacity={opacity.value}
                        fill="#000000"
                    >
                        <LabelList
                            dataKey="value"
                            position="insideTop"
                            angle="45"
                            content={renderCustomizedLabel}
                        />
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors2[index % 20]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StrikeRateBreakdown;
