import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({data, width, height}) => {
    
    return (
        <BarChart width={width} height={height} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data[0] && Object.keys(data[0]).map((key, index) => {
                if (key !== 'name') {
                    return <Bar key={index} dataKey={key} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />;
                }
                return null;
            })}
        </BarChart>
    );
};

export default Chart;