import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const { login, logout, isLoggedIn, user } = useContext(AuthContext);
  const [userName, setUserName] = useState('');

  const handleLogin = () => {
    login(userName);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View>
          <Text style={styles.loggedInText}>Logged in as: {user.name}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            placeholder="Username"
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
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
  input: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 4,
  },
  loggedInText: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default Login;