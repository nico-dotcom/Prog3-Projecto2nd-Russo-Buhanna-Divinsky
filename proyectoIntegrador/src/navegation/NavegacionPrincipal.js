import React, {Component} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Login from '..screens/Login'
import Home from '..screens/Home'

const Stack = createNativeStackNavigator()

export default class NavegacionPrincipal extends Component {
    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen name= "login" component = {Login} options = {{headerShown:false}} />
                <Stack.Screen name= "home" component = {Home} options = {{headerShown:false}} />

            </Stack.Navigator>
        )
    }
}