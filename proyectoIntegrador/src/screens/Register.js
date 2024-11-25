import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import FormularioRegister from '../components/FormularioRegister';

export default class Register extends Component{
    constructor(props){
    super(props)
    }
    render(){
        return(
        <View>
            <FormularioRegister navigation = {this.props.navigation}/>
        </View>
            )
        }
    }