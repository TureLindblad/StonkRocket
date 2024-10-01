import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchComponent from './SearchComponent';
import Login from './Login';

const Navbar = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const { width } = useWindowDimensions(); // Dynamisk skärmstorlek

    const isSmallScreen = width < 768; // Gräns för mindre skärm

    // Function to toggle the hamburger menu visibility
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <View style={[styles.navbar, isSmallScreen && styles.navbarSmall]}>
            {/* Logo */}
            <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
                <Image source={require('../assets/StonkRocket.png')} style={styles.logo} />
            </TouchableOpacity>


             {/* Search Component */}
            <SearchComponent />

            {/* Login Button */}
            <View style={styles.login}>
            <Login />
            </View> 

            {/* Hamburger Menu */}
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={toggleMenu}>
                    <Text style={styles.menuLabel}>☰</Text>
                </TouchableOpacity>

                {/* Menu Items (shown conditionally) */}
                {menuVisible && (
                    <View style={[styles.pageLinks, isSmallScreen && styles.pageLinksSmall]}>
                        <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('DashboardPage'); }}>
                            <Text style={styles.linkText}>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('MainPage'); }}>
                            <Text style={styles.linkText}>Main Page</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    navbarSmall: {
        flexDirection: 'column',
        // alignItems: 'flex-start',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    logoSmall: {
        width: 30,
        height: 30,
    },
    menuContainer: {
        position: 'relative',
    },
    menuLabel: {
        fontSize: 30,
        marginLeft: 10,
        color: '#000',
    },
    menuLabelSmall: {
        fontSize: 10,
    },
    pageLinks: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: '#f8f9fa',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pageLinksSmall: {
        position: 'relative',
        top: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 0,
        width: '100%',
    },
    linkText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#007bff',
    },
    login: {
    }
});

export default Navbar;
