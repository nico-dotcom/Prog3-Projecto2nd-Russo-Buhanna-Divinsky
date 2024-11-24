import React, {Component} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Stack = createNativeStackNavigator()

export default class NavegacionPrincipal extends Component {
    render(){
        return(
            <Stack.Navigator>
                
                <Stack.Screen name= "home" component = {Home} options = {{headerShown:false}} />
                <Stack.Screen name= "login" component = {Login} options = {{headerShown:false}} />
                <Stack.Screen name= "register" component = {Register} options = {{headerShown:false}} />
                
            </Stack.Navigator>
        )
    }
}