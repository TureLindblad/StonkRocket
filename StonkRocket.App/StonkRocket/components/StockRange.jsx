import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import config from '../config.js';

const StockRange = ({ ticker }) => {
    const [stonks, setStonks] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const multiplier = 1;
    const timespan = 'day';
    const startDate = '2023-01-09';
    const endDate = '2023-02-10';

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`${config.apiUrl}/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${startDate}/${endDate}?apiKey=${config.apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Något gick fel vid hämtning av data');
                }
                return response.json();
            })
            .then(data => {
                setStonks(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false); 
            });
    }, [ticker]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        Alert.alert("Error", `Error loading data: ${error}`);
        return null;
    }

    if (!stonks || !stonks.results) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No data available</Text>
            </View>
        );
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];
    }

    const dates = stonks.results.map(item => formatDate(item.t));
    const closePrices = stonks.results.map(item => item.c);

    const data = {
        labels: dates,
        datasets: [{
            label: 'Close Price',
            data: closePrices,
            color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, 
            strokeWidth: 2 
        }],
    };

    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Graph: {stonks.ticker}</Text>
            <BarChart
                data={data}
                width={400} 
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForLabels: {
                        fill: 'black',
                    },
                    paddingLeft: 20 
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                withInnerLines={false}
            />
        </View>
    );
};

export default StockRange;
