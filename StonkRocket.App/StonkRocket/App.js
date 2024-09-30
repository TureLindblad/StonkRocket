import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import StockViewPage from './pages/StockViewPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import MainPage from './pages/MainPage.jsx'
import { AuthProvider } from "./AuthContext.jsx"

const Stack = createStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MainPage'>
          <Stack.Screen name='MainPage' component={MainPage} options={{title: 'Main Page'}} />
          <Stack.Screen name='StockViewPage' component={StockViewPage} options={{title: 'Stock View'}} />
          <Stack.Screen name='DashboardPage' component={DashboardPage} options={{title: 'Dashboard'}} />
        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>
  );
}
