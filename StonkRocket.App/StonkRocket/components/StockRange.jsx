import { useState, useEffect } from "react";
import config from "../config.js";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error}</div>;
    }

    if (!stonks || !stonks.results) {
        return <div>No data available</div>;
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
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 5,

        }],
    };

    const options = {
        responsive: true,
        layout: {
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Close: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                    padding: 10
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    padding: 10
                },
                grid: {
                    drawBorder: false
                }
            }
        }
    };

    return (
        <div>
            <h1><strong>Graph:</strong> {stonks.ticker}</h1>
            <Bar data={data} options={options} />
        </div>
    );
};

export default StockRange;
