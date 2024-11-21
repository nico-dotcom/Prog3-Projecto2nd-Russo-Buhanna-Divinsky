import {Text,View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {auth,db} from '../firebase/config';

export default class FormularioRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password:'',
            error:'',
            loggedIn: false,
            usuarios: [],
        }
    }
       
    submit(email,password){
        if(!email.includes('@')){
            this.setState({error: "Ingrese un formato de email valido"})
            return
        }
        if(password.length < 5){
            this.setState({error: "Ingrese una password con un minimo de 6 caracteres"})
            return
        }
        
        auth.signInWithEmailAndPassword(email,password)
            .then((response) =>{
                this.setState({loggedIn: true});
                this.props.navigation.navigate('home')
            })
            .catch(error => {
                this.setState({error:'Credenciales invalidas'})
            })
    }

    irARegister(){
        this.props.navigation.navigate('register')
    }

    render(){
        return (
        <View style={styles.container}>
            
            <TouchableOpacity style={styles.IrRegistro} onPress={()=> this.irARegister()}>
                <Text style={styles.buttonText}>Registrarme</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Iniciar Sesión</Text>
            
            {/* Input mail */}
            <TextInput
                style = {styles.input}
                placeholder = "Ingrese su correo"
                keyboardType='email-address'
                onChangeText = {(text => this.setState({ email:text , error:'' }))}
                value = {this.state.email}
            />

             {/* Input nombre de password */}
             <TextInput
                style = {styles.input}
                placeholder = "Ingrese su contraseña"
                secureTextEntry={true}
                onChangeText = {(text => this.setState({ password:text , error:'' }))}
                value = {this.state.password}
            />
            {
                this.state.error !== ''
                &&
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
            }
            <TouchableOpacity style={styles.button} onPress={()=>this.submit(this.state.email, this.state.password)}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
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
    IrRegistro:{
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center'
    }
})
