import { View, Text } from "react-native-web"
import Navbar from "../components/NavBar"
import UserDashboard from "../components/UserDashboard"

const DashboardPage = () => {
    return (
        <View>
            <Navbar />
            <UserDashboard />
        </View>
    )
}

export default DashboardPage