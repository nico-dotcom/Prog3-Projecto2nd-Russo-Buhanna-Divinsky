import {Text,View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {auth,db} from '../firebase/config';

export default class FormularioRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion: '',
            fecha_creacion:'',
            email:'',
            error:'',
            loggedIn: false,
            creadoBien: ''
        }
    }
  
    submit(){
        db.collection('posts').add({
            email: auth.currentUser.email,
            descripcion: this.state.descripcion,
            fecha_creacion: Date.now(),
            like: []   
     })
     .then((response) =>{
        this.setState({creadoBien: "Se creo satisfactoriamente"})
        console.log("creado correctamente")
    })
     .catch(e => console.log(e))
     
    }

    render(){
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear un posteo</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Ingrese la descripcion"
                keyboardType='default'
                onChangeText = {(text => this.setState({ descripcion :text , error:'' }))}
                value = {this.state.descripcion}
            />
            {
                this.state.error !== ''
                &&
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
            }

{
                this.state.creadoBien !== ''
                &&
                <Text style={styles.creadoBien}>
                    {this.state.creadoBien}
                </Text>
            }

            <TouchableOpacity style={styles.button} onPress={()=>this.submit()}>
                <Text style={styles.buttonText}>Cargar posteo</Text>
            </TouchableOpacity>
           
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
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    },
    creadoBien:{
        color: 'green',
        marginBottom: 10
    }
})
