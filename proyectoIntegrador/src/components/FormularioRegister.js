import {Text,View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {auth,db} from '../firebase/config';

export default class FormularioRegister extends Component {
    constructor(props){
    super(props)
    this.state= {
    email: '',
    username:'',
    password:'',
    error:''
    }
    }

    componentDidMount() {     
        auth.onAuthStateChanged(user => { 
            if (user) {
                console.log("Estas iniciado con la cuenta:", user.email)
                this.props.navigation.navigate('TabNav');
            } 
        });
    }

    submit(email,username,password){
        if(!email.includes('@')){
        this.setState({error: "Ingrese un formato de email valido"})
        return
}
        if(username.length < 2) {
        this.setState({error: "Ingrese un username con un minimo de 3 caracteres"})
        return
        }

        if(password.length < 5){
            this.setState({error: "Ingrese una password con un minimo de 6 caracteres"})
            return
    }

    auth.createUserWithEmailAndPassword(email,password)
    .then((user)=>{
        if(user){
            db.collection('users').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            username: username,
        })
        .then(
            this.props.navigation.navigate('home')
            )
        }
    })
    .catch(err=>{
        if(err.code==="auth/email-already-in-use"){
        this.setState({error:"El mail ingresado ya esta en uso"})
        }
    })
    }

    irAlLogin(){
        this.props.navigation.navigate('login')
        }
    
        render(){
            return (
            <View style={styles.container}>
    
                <TouchableOpacity style={styles.IrRegistro} onPress={()=> this.irAlLogin()}>
                    <Text style={styles.buttonText}>Log-in</Text>
                </TouchableOpacity>
    
            <Text style={styles.title}>Registro</Text>
            {/* Input mail */}
            <TextInput
                style= {styles.input}
                placeholder= "Ingrese su correo"
                keyboardType='email-address'
                onChangeText= {(text => this.setState({ email:text , error:'' }))}
                value= {this.state.email}
            />
            {/* Input nombre de usuario */}
            <TextInput
                style= {styles.input}
                placeholder= "Ingrese su nombre de usuario"
                keyboardType='default'
                onChangeText= {(text => this.setState({
                username:text , error:'' }))}
                value= {this.state.username}
            />
            {/* Input nombre de password */}
            <TextInput
                style= {styles.input}
                placeholder= "Ingrese su contraseña"
                secureTextEntry={true}
                keyboardType='default'
                onChangeText= {(text => this.setState({
                password:text, error:'' }))}
                value= {this.state.password}
            />
            {
            this.state.error !== ''
            &&
            <Text style={styles.errorText}>
            {this.state.error}
            </Text>
            }
    
            <TouchableOpacity style={styles.button} onPress={()=>this.submit(this.state.email, this.state.username, this.state.password)}>
            <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            
        </View>
        )}
    }
    
    const styles= StyleSheet.create({
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
            marginBottom: 20,
            color: '#333'
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
    
        errorText: {
            color: 'red',
            marginBottom: 10
        },
    
        button: {
            width: '100%',
            padding: 15,
            backgroundColor: "#007BFF",
            borderRadius: 5,
            alignItems: 'center'
        },
    
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold'
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