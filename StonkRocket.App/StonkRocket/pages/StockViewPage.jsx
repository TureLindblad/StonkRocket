import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Navbar from "../components/NavBar";
import StockView from "../components/StockView";
import config from "../config";

const StockViewPage = ({ route }) => {
    const { search } = route.params;
    const [stock, setStock] = useState();

    useEffect(() => {
        fetch(`${config.apiUrl}/aggs/ticker/${search}/prev?apiKey=${config.apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Stock not found");
                }
                return response.json();
            })
            .then(data => {
                if (data.results) {
                    setStock(data);
                    updateDb(data.results[0].T);
                } else {
                    setStock(null);
                }
            })
            .catch(error => console.log('Error loading data', error));
    }, [search]);

    const updateDb = (ticker) => {
        fetch(`${config.stonkRocketApiUrl}/stock/${ticker}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ticker })
        })
        .catch(error => {
            console.error('Error updating database:', error);
        });
    };

    return (
        <View style={styles.container}>
            <Navbar />
            {stock === undefined ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading...</Text>
                </View>
            ) : stock ? (
                <StockView stock={stock} />
            ) : (
                <Text style={styles.notFoundText}>Stock not found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 18,
        color: '#ff0000',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default StockViewPage;
