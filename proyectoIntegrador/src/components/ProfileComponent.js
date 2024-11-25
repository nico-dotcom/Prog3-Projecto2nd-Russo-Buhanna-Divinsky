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
                this.setState({profiles: auth.currentUser});

                const mailUser = auth.currentUser.email;

                db.collection('users').onSnapshot(
                    docs => {
                        docs.forEach(
                            doc => {
                                if (doc.data().owner === mailUser) {
                                    this.setState({
                                        profileEmail: doc.data().owner,
                                        profileCreationTime: doc.data().createdAt,
                                        profileUsername: doc.data().username,
                                    });
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

            }
        });
    }

    logOut = () => {
        auth.signOut().then(() => {
            console.log('User logged out');
        }).catch((error) => {
            console.error('Sign out error: ', error);
        });

        this.props.navigation.navigate('login')
    };

    deletePost = (postId) => {
        console.log('Delete post: ', postId);

        console.log(db.collection('posts'))

        db.collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
            console.log('Post deleted');
        }).catch((error) => {
            console.error('Delete post error: ', error);
        }
        );
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.IrRegistro} onPress={this.logOut}>
                        <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileText}>Email: {this.state.profileEmail}</Text>
                        <Text style={styles.profileText}>Username: {this.state.profileUsername}</Text>
                        <Text style={styles.profileText}>Creation time: {this.state.profileCreationTime}</Text>
                    </View>

                    <View style={styles.postContainerTOP}>

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

                                <TouchableOpacity style={styles.Delete} onPress={() => this.deletePost(item.id)}>
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

    postContainerTOP: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '##ffffff',
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

    profileInfo: { 
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },

    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#007BFF',
        borderColor: '#007BFF',
        marginBottom: 30,
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

    Delete:{
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center'
    },

    IrRegistro:{
        position: 'fixed',
        zIndex: 1,
        top: 10,
        right: 10,
        padding: 8,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center'
    }
});

export default ProfileComponent;