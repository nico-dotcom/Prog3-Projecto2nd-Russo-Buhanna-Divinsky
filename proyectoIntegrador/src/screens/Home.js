import {Text,View, TouchableOpacity} from "react-native";
import React, {Component} from "react";
import HomeGet from '../components/HomeGet';  

export default class Home extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return(
            <View> 
                <HomeGet navigation ={this.props.navigation}/>
            </View>
        )
    }
}