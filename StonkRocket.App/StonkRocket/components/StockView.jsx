import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import config from "../config";
import StockRange from "../components/StockRange";
import { AuthContext } from "../AuthContext";
import RemoveButton from './RemoveButton';

const StockView = ({ stock }) => {
    const [showGraph, setShowGraph] = useState(false);
    const { user, getUser } = useContext(AuthContext);

    if (!stock) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    const handleFollow = () => {
        fetch(`${config.stonkRocketApiUrl}/user/stocks/${user.id}?ticker=${stock.results[0].T}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            getUser(user.id)
            if (!response.ok) {
                throw new Error(`Unable to post with error code: ${response.status}`)
            }
        })
        .catch(error => {
            console.log('Error posting data', error)
            alert('Error posting data', error)
        })
    }

    return (
        <View style={styles.stockViewContainer}>
            {user.stocks.some(userStock => userStock.ticker === stock.results[0].T) ?
            (
                <RemoveButton ticker={stock.results[0].T} />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleFollow}>
                    <Text style={styles.buttonText}>Follow Stock</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={() => setShowGraph(prev => !prev)}>
                <Text style={styles.buttonText}>Toggle Graph</Text>
            </TouchableOpacity>
            {!showGraph ? (
                <View style={styles.stockInfo}>
                    <Text style={styles.stockText}><Text style={styles.label}>Yesterday's Value: </Text>{stock.results[0].T}</Text>
                    <Text style={styles.stockText}><Text style={styles.label}>Open: </Text>{stock.results[0].o}</Text>
                    <Text style={styles.stockText}><Text style={styles.label}>High: </Text>{stock.results[0].h}</Text>
                    <Text style={styles.stockText}><Text style={styles.label}>Low: </Text>{stock.results[0].l}</Text>
                    <Text style={styles.stockText}><Text style={styles.label}>Close: </Text>{stock.results[0].c}</Text>
                    <Text style={styles.stockText}><Text style={styles.label}>Volume: </Text>{stock.results[0].v}</Text>
                    <Text style={styles.stockText}><Text style={styles.label}>VWAP: </Text>{stock.results[0].vw}</Text>
                    <Text style={styles.stockText}><Text style={styles.label}>Transactions: </Text>{stock.results[0].n}</Text>
                </View>
            ) : null}
            {showGraph && (
                <View style={styles.graphContainer}>
                    <StockRange ticker={stock.results[0].T} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    stockViewContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    button: {
        backgroundColor: '#6200ee',
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    stockInfo: {
        marginVertical: 16,
    },
    stockText: {
        fontSize: 16,
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
    },
    graphContainer: {
        marginTop: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StockView;
