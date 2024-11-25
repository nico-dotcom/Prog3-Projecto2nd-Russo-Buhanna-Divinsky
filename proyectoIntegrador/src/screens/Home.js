import {Text,View,StyleSheet,ActivityIndicator,FlatList} from "react-native";
import React, {Component} from "react";
import HomePage from '../components/HomePosteo';  
import {auth, db} from '../firebase/config';



export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            posteos: [],
            error: '',
        }
    }
    componentDidMount(){
        db.collection('posts')
        .orderBy("fecha_creacion", "desc")
        .onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    posteos: posts,
                    loading: false
                }, ()=> console.log("posteos", this.state.posteos));
            },
            error => {
                console.error("Salto el siguiente error: ", error);
                this.setState({loading: false});
            }
        );
    }
    render() {
        return(
            <View> 
                {/* --- */}
                <View style={styles.container}>

<Text style={styles.title}>Home</Text>

{this.state.loading ? (
    <ActivityIndicator size="large" color="#007BFF" />
) : (

    <FlatList
        data={this.state.posteos}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
            <HomePage item={item} />
        )} />
    )
    }
    
                {/* --- */}

                </View>
                </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:20,
    },

    listContainer: {
        paddingBottom: 20,
    },

    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom:10,
        marginRight:10,
        marginLeft:10,
        padding:10
    },

    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#007BFF',
    },

    postDate: {
        fontSize: 14,
        color: '#666',
    },

    postLike: {
        fontSize: 14,
        marginTop: 5,
        color: '#666',
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
    },
});