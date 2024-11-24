import {Text,View, TouchableOpacity} from "react-native";
import React, {Component} from "react";

export default class Home extends Component{
    render() {
        return(
            <View>
                <Text>Home</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("login")}>
                    <Text>Ir a login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}