import { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import config from "../config"
import { useNavigation } from '@react-navigation/native';

const SearchComponent = () => {
    const [input, setInput] = useState('');
    const [tickers, setTickers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [viewSuggestions, setViewSuggestions] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${config.stonkRocketApiUrl}/stocks`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error getting stocks: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                const mapedTickers = data.stocks.map(stock => stock.ticker)
                setTickers(mapedTickers)
                setSuggestions(mapedTickers)
            })
            .catch(error => console.log('Error loading data', error))
    }, [])

    useEffect(() => {
        input ? setViewSuggestions(true) : setViewSuggestions(false)

        const filter = tickers.filter(ticker => ticker.toUpperCase().includes(input.toUpperCase()))
        setSuggestions(filter)
    }, [input])

    const handleInput = (text) => {
        setInput(text);
    };

    const handleSubmit = () => {
        setInput('');
        navigation.navigate('StockViewPage', { search: input.toUpperCase() });
    };

    const renderSuggestion = ({ item }) => (
        <TouchableOpacity
            key={item}
            style={styles.suggestion}
            onPress={() => {
                setInput('');
                navigation.navigate('StockViewPage', { search: item });
            }}
        >
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={handleInput}
                placeholder="Search ticker..."
            />
            {viewSuggestions && suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item}
                    renderItem={renderSuggestion}
                />
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    suggestion: {
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
});

export default SearchComponent;