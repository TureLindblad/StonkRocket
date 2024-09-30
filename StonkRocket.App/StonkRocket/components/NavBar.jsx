import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchComponent from './SearchComponent';
import Login from './Login';

const Navbar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
                <Image source={require('../assets/StonkRocket.png')} style={styles.logo} />
            </TouchableOpacity>

            <SearchComponent />
            <Login />

            <View style={styles.menuContainer}>
                <TouchableOpacity>
                    <Text style={styles.menuLabel}>☰</Text>
                </TouchableOpacity>

                <View style={styles.pageLinks}>
                    <TouchableOpacity onPress={() => navigation.navigate('DashboardPage')}>
                        <Text style={styles.linkText}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
                        <Text style={styles.linkText}>Main Page</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
    },
    logo: {
        width: 40,
        height: 40,
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuLabel: {
        fontSize: 30,
        marginLeft: 10,
    },
    pageLinks: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    linkText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#000',
    },
});

export default Navbar;
