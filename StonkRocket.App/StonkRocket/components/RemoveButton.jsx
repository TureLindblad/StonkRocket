import { useContext } from "react"
import config from "../config"
import { AuthContext } from "../AuthContext";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

const RemoveButton = ({ ticker }) => {
    const { user, getUser } = useContext(AuthContext);

    const removeFavourite = () => {
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

    return (
        <TouchableOpacity style={styles.button} onPress={removeFavourite}>
            <Text style={styles.buttonText}>Unfollow</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ff3b30',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default RemoveButton