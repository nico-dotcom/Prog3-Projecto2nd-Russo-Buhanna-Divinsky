import {Text,View, TouchableOpacity} from "react-native";
import React, {Component} from "react";

export default class Login extends Component{
    constructor(props){
        super(props)
    }

    irARegister(){
        this.props.navigation.navigate('register')
    }

    render() {
        return(
            <View> 
                <Text>Estamos en el login</Text>
                <TouchableOpacity onPress={()=> this.irARegister()}>Vamos a register</TouchableOpacity>
            </View>
        )
    }
}