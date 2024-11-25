import {Text, View, FlatList, StyleSheet,TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import AntDesign from '@expo/vector-icons/AntDesign';
import firebase from 'firebase';
export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            like:false        
        }
    }

    componentDidMount(){
        const mailUser = auth.currentUser.email;
        const verificarLike =  this.props.item.data.like.includes(mailUser);
        if(verificarLike == true){
            this.setState({like: true})
    }}

    like(id){     
        const mailUser = auth.currentUser.email;
        console.log("like info" , this.state.likeinfo)

        db.collection('posts')
            .doc(id)
            .update({
                like: firebase.firestore.FieldValue.arrayUnion(mailUser)
            })
            .then (()=> {
                this.setState({like: true});
                console.log("se likeo correctamente")
            }),
            error => {
                console.error("Salto el siguiente error: ", error);
                this.setState({loading: false});
            }}
                
            

    dislike(id){
        const mailUser = auth.currentUser.email;

        db.collection('posts')
        .doc(id)
        .update({
            like: firebase.firestore.FieldValue.arrayRemove(mailUser)

        })
        .then (()=> {
            this.setState({like: false});
            console.log("se deslikeo correctamente")
        }),
        error => {
            console.error("Salto el siguiente error: ", error);
            this.setState({loading: false});
    }
    }

    render() {
        return (

                            <View style={styles.postContainer}>

                               

                                <Text style={styles.postTitle}>
                                    Reseña:
                                </Text>

                                <Text style={styles.descripcion}>  {this.props.item.data.descripcion} </Text>

                                <Text style={styles.postDate}>
                                    Fecha: {this.props.item.data.fecha_creacion}
                                </Text>

                                <Text style={styles.postLike}>
                                    Likes: {this.props.item.data.like.length}
                                </Text>

                                <Text style={styles.email}>
                                    Email del creado: {this.props.item.data.email}
                                </Text>

                             
                                {
                                this.state.like === true ? (
                                    <TouchableOpacity style={styles.Like} onPress={() => this.dislike(this.props.item.id)}>
                                       <AntDesign name="heart" size={24} color="black" />

                                </TouchableOpacity>
                                   
                                ) : (
                                    <TouchableOpacity style={styles.Like} onPress={() => this.like(this.props.item.id)}>
                                       <AntDesign name="hearto" size={24} color="black" />


                                </TouchableOpacity>
                                )
                            }


                            </View>
                        
        );
    }
    
}
const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom:20,
        marginRight:10,
        marginLeft:10,
        padding:10
    },

    postTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'black',
    },

    postDate: {
        fontSize: 14,
        color: '#666',
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        marginBottom:20
    },

    postLike: {
        fontSize: 14,
        marginTop: 5,
        color: '#666',
    },
    Like:{
        marginTop: -50,
        marginLeft: 300,
        padding: 8,
        borderRadius: 5,
        alignItems: 'center'
    },
    descripcion:{
        fontSize: 15,
        marginBottom: 15,
        color: 'black',


    }
});
