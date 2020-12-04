/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Alert, SafeAreaView } from 'react-native';
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
            <SafeAreaView style = {styles.homeContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>SalonSort</Text>
                    <Text style={styles.welcomeSubText}>Select view clients to start managing notes for your clientele!</Text>
    
                </View>
                <TouchableOpacity
                    style={styles.viewClient}
                onPress={() => this.props.navigation.navigate('Clients')}
                >
                    <Text style={styles.viewClientsText}>View Clients</Text>
                </TouchableOpacity>
                 

                   <AuthContext.Consumer>
                       {(value) => (
                           <View >
                            <TouchableOpacity 
                        
                            onPress={() =>{value.logOutUser,  this.handleSignOut()}}
                            >
                                <Text style= {styles.text}>Log Out</Text>
                            </TouchableOpacity>
                           </View>
                       )}
                       
                       
                        </AuthContext.Consumer>
            </SafeAreaView>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(40, 41, 41, .8)',
        width: '100%',
       
        
    },
    welcomeContainer:{
        width: '100%',
    },
    welcomeText:{
        fontSize: 60,
        textAlign: 'center',
        color:'rgba(255, 255, 255, .8)',
        fontWeight: '900',
        fontFamily: 'Snell Roundhand',
        letterSpacing: 1.5 
    },
    welcomeSubText:{
        fontSize: 20,
        textAlign: 'center',
        color:'rgba(255, 255, 255, .9)',
        fontWeight: '300',
        fontFamily: 'arial',
        fontStyle:'italic',
        paddingTop: 35,
        paddingLeft:50,
        paddingRight: 50,
        letterSpacing: 1
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
        backgroundColor: 'rgba(151, 232, 213, .6)',
    
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
    viewClientsText:{
        color: 'rgba(255,255,255, .8)',
        fontSize: 25,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    text:{
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 18,
        padding:10,
    }
})