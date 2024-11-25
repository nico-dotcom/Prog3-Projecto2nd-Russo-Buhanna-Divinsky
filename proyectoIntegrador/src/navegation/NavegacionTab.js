import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search'
import Postear from '../screens/Postear';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
            <Tab.Navigator screenOptions={{tabBarShowLabel:false, headerShown: false}}>
                <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <Entypo name="home" size={24} color="black" />}}/>
                <Tab.Screen name="Search" component={Search} options={{tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />}}/>
                <Tab.Screen name="Postear" component={Postear} options={{tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />}}/>
                {<Tab.Screen name="Perfil" component={Profile} options={{tabBarIcon: () => <Feather name="user" size={24} color="black" />}}/>}

            </Tab.Navigator>
    );
}

export default TabNavigator;
