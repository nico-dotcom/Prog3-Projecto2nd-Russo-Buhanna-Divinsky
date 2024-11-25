import {Text,View,StyleSheet,ActivityIndicator,FlatList} from "react-native";
import React, {Component} from "react";
import HomePage from '../components/HomePosteo';  
import {db} from '../firebase/config';

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
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Reseñas de usuarios</Text>

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
                    </View>
                </View>

        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:30,
        marginTop:40
    },
    posteos:{
        marginBottom:20
    }

});