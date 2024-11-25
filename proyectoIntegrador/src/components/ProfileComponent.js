import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import 'firebase/firestore';

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileEmail: '',
            profileCreationTime: '',
            profileUsername: '',
            postsUser: [],
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('User logged in');
                console.log(auth.currentUser);
                this.setState({profiles: auth.currentUser});

                const mailUser = auth.currentUser.email;

                db.collection('users').onSnapshot(
                    docs => {
                        docs.forEach(
                            doc => {
                                console.log(doc.data().owner);
                                console.log(mailUser);
                                console.log(doc);
                                
                                if (doc.data().owner === mailUser) {
                                    console.log(doc.data().owner);
                                    console.log(doc.data().createdAt);
                                    console.log(doc.data().username);
                                    this.setState({
                                        profileEmail: doc.data().owner,
                                        profileCreationTime: doc.data().createdAt,
                                        profileUsername: doc.data().username,
                                    });
                                }
                                else {
                                    console.log('No such document');
                                }
                            }
                        );
                    }
                )

                db.collection('posts').where('email' , '==', mailUser).onSnapshot(
                    docs => {
                        let posts = [];
                        docs.forEach(doc => {
                            posts.push({
                                id: doc.id,
                                data: doc.data()
                            });
                        });
                        this.setState({
                            postsUser: posts,
                            loading: false
                        });
                    },
                    error => {
                        console.error("Salto el siguiente error: ", error);
                        this.setState({loading: false});
                    }
                );

            } else {
                console.log('User logged out');
            }
        });
    }

    deletePost = (postOwner) => {
        db.collection('posts').where('owner' , '==', this.state.profileEmail).update
            .then(() => {
                console.log("Post successfully deleted!");
                this.setState({
                    postsUser: this.state.postsUser.filter(post => post.owner !== postOwner)
                });
                firebase.firestore().collection('posts').doc(postOwner).delete();
            }).catch((error) => {
                console.error("Error removing post: ", error);
            });
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Text style={styles.profileText}>Email: {this.state.profileEmail}</Text>
                    <Text style={styles.profileText}>Username: {this.state.profileUsername}</Text>
                    <Text style={styles.profileText}>Creation time: {this.state.profileCreationTime}</Text>

                    <View style={styles.postContainer}>

                    <Text style={styles.postTitle}>Publicaciones: {this.state.postsUser.length}</Text> 
                    <Text style={styles.postTitle}>Mis Posts:</Text>
                    <FlatList
                        data={this.state.postsUser}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.postContainer}>

                                <Text style={styles.postTitle}>
                                    Descripción: {item.data.descripcion}
                                </Text>

                                <Text style={styles.postDate}>
                                    Fecha: {item.data.fecha_creacion}
                                </Text>

                                <Text style={styles.postLike}>
                                    Likes: {item.data.like.length}
                                </Text>

                                <TouchableOpacity style={styles.Like} >
                                    <Text style={styles.buttonText}>Like</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.Delete} onPress={() => this.deletePost(item.owner)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    />
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profileContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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
    Like:{
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center'
    },

    Delete:{
        top: 10,
        right: 10,
        padding: 8,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center'
    },
});

export default ProfileComponent;