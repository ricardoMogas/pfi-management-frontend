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
            <Bar dataKey="value1" fill="#8884d8" />
            <Bar dataKey="value2" fill="#82ca9d" />
        </BarChart>
    );
};

export default Chart;