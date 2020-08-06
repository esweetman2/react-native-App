/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';


import { AuthContext } from '../Context/context'


export default class Home extends Component {
    _isMounted = false;
    constructor(props){
        super(props)
            this.state = {
                name:'',
                email: "",
                password:'',
                errorMessage: null,
                user: ""
            };
    }

  componentDidMount(){
      this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
        if (user && this._isMounted === true) {
          this.setState({
              email: user.email,
              user: user,
              
          })
        } else  {
          return
        }
      });
  }  

  componentWillUnmount(){
      this._isMounted = false;
      this.setState({
          user: null,
          email: null
      })
  }


handleSignOut(){
    Alert.alert(
        'Confirm',
        'Are you sure you want to sign out?',
        [
          {text: 'Cancel', onPress: () => {return}, style: 'cancel'},
          {text: 'Yes, Sign Out', onPress: () => {
            if(this.state.user){
        
                firebase.auth().signOut();
            
                }else{
                    return
                }
          }}
        ],
        { cancelable: false }
      )
    
    
    
}
    


  render() {
    return (
        <ImageBackground
        style={styles.imageBackground}
        source= {require('../images/grayscale-photo-of-woman-1399073.jpg')}
        >
            <View style = {styles.homeContainer}>
                <View style={styles.welcomeContainer}>
    <Text style={styles.welcomeText}>Welcome Back</Text>
    <Text style={styles.welcomeSubText}>Select view clients to start managing notes for each of your client's!</Text>
    
                </View>
                <TouchableOpacity
                    style={styles.viewClient}
                onPress={() => this.props.navigation.navigate('Clients')}
                >
                    <Text style={styles.viewClientsText}>View Clients</Text>
                </TouchableOpacity>
                 

                   <AuthContext.Consumer>
                       {(value) => (
                           <TouchableOpacity 
                    
                           onPress={() =>{value.logOutUser,  this.handleSignOut()}}
                           >
                               <Text style= {styles.text}>Log Out</Text>
                           </TouchableOpacity>
                       )}
                       
                        </AuthContext.Consumer>
            </View>
      </ImageBackground>

    );
  }
}


const styles = StyleSheet.create({
    imageBackground:{
        width: '100%',
        height: '100%'
    },
    homeContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(166, 211, 232, .7)',
        width: '100%',
       
        
    },
    welcomeContainer:{
        width: '100%',
        marginTop:-150,
        marginBottom: 150,
        
        
    },
    welcomeText:{
        fontSize: 45,
        textAlign: 'center',
        color:'black'
        
    },
    welcomeSubText:{
        fontSize: 20,
        textAlign: 'center',
        color:'black',
        
        paddingTop: 35,
        paddingLeft:50,
        paddingRight: 50
    },
    viewClient:{
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: 'rgba(151, 232, 213, .5)',
    
    },
    userContainer:{ 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',  
    },
    loginContainer:{
        marginTop: 75, 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    login:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:25,
        borderBottomWidth: 2,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomColor: 'white',
        width: '75%',
        
        fontSize: 25,
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 18
    },
    loginBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom:30,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '75%',
        backgroundColor: '#EAFEFF',  
        paddingTop: 10,
        paddingBottom: 10,
        
    },
    register:{
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        width: '60%',
        backgroundColor: '#EAFEFF',  
        paddingTop: 10,
        paddingBottom: 10,
        
    },
    viewClientsText:{
        color: 'rgba(0, 0, 0, .8)',
        fontSize: 25,
        letterSpacing: 5
    },
    text:{
        color: 'black',
        fontSize: 18,
        padding:10,
        marginTop: 50,
        fontWeight: 'bold'
        
    }
})