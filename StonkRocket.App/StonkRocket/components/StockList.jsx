import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import config from "../config.js";

const StockList = () => {
    const [stocks, setStocks] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${config.stonkRocketApiUrl}/stocks`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error getting stocks: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setStocks(data.stocks);
            })
            .catch(error => console.log('Error loading data', error));
    }, []);

    if (!stocks.length) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const handleClick = (ticker) => {
        navigation.navigate('StockViewPage', { search: ticker });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.stockListItem} onPress={() => handleClick(item.ticker)}>
            <Text>{item.ticker}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>List of Popular Stocks</Text>
            <FlatList
                data={stocks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    stockListItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
});

export default StockList;
