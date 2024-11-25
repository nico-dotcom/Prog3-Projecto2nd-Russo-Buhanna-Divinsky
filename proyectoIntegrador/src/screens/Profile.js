import {Text, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import ProfileComponent from '../components/ProfileComponent';

export default class Profile extends Component {
    render() {
        return (
            <View>
                <ProfileComponent navigation ={this.props.navigation} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('home')}>
                    <Text>Ir a home</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
