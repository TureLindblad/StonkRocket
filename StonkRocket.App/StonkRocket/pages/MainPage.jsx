import { View, Text } from "react-native-web";
import Navbar from "../components/NavBar.jsx";
import StockList from "../components/StockList";

function MainPage(){
    return(
        <View>
            <Navbar />
            <StockList />
        </View>
    )
}

export default MainPage;