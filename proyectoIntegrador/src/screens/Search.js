import {Text,View} from "react-native";
import React, {Component} from "react";
import BusquedaUsuario from '../components/BusquedaUsuario';  

export default class Search extends Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View> 
                <BusquedaUsuario navigation ={this.props.navigation}/>
            </View>
        )
    }
}