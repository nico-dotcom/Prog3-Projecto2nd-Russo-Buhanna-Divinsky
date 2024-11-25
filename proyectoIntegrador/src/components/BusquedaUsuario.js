import {Text,View, TextInput, FlatList, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {auth,db} from '../firebase/config';

export default class BusquedaUsuario extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            search: '',
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let usuarios = [];

            docs.forEach(doc => {
                usuarios.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            this.setState({
                users: usuarios,
            });
        });
    }

    detectarCambios(input){
        this.setState({
            search: input
        })
    }

    render(){
        const {users, search} = this.state;

        const filtrarUsuario = users.filter(user =>user.data.username.toLowerCase().includes(search.toLowerCase()));
        
        return (

        <View style={styles.container}>

            <Text style={styles.title}>Buscar un usuario</Text>
            
            <TextInput
                style = {styles.input}
                placeholder = "Ingrese el usuario"
                keyboardType='default'
                onChangeText = {event => this.detectarCambios(event)}
                value = {search}
            />
            {
                search !== ''
                &&
                <FlatList
                data={filtrarUsuario}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.usuario}>{item.data.username}</Text>
                )}
            />
            }
             
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 40, 
        marginBottom: 20, 
        color: '#333',
    },
    input:{
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    usuario: {
        fontSize: 18,
        color: "black",
        padding: 10,
    },
})
