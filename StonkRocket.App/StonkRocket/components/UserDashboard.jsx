import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from "../config";
import { AuthContext } from "../AuthContext";

const UserDashboard = () => {
  const { user, isLoggedIn, getUser } = useContext(AuthContext);
  const navigation = useNavigation();

  if (!user) {
    return (
      <View style={styles.container}>
        {isLoggedIn ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text>Not logged in</Text>
        )}
      </View>
    );
  }

  const handleClick = (ticker) => {
    navigation.navigate('StockViewPage', { search: ticker });
  };

  const removeFavourite = (ticker) => {
    fetch(`${config.stonkRocketApiUrl}/user/stocks/${user.id}?ticker=${ticker}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        getUser(user.id)
        if (!response.ok) {
            throw new Error(`Unable to delete with error code: ${response.status}`)
        }
    })
    .catch(error => {
        console.log('Error removing data', error)
        alert(`Error removing data: ${error.message}`)
    })
  }

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => handleClick(item.ticker)}>
        <Text style={styles.tickerText}>{item.ticker}</Text>
      </TouchableOpacity>
      <Button
        title="Remove"
        color="#FF0000"
        onPress={() => removeFavourite(item.ticker)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of favourite stocks</Text>
      <FlatList
        data={user.stocks}
        keyExtractor={(item) => item.ticker}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  tickerText: {
    fontSize: 25,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default UserDashboard;
