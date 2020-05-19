// CheckLogin
import React, {useEffect, useContext} from 'react'
import {View, StyleSheet, Text, ImageBackground, Image} from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'

const CheckLogin  = () => {

    const { state, signup, tryLocalSignin } = useContext(AuthContext);
    useEffect(() =>{
        tryLocalSignin();
    },[]);
      return (
        <ImageBackground source={require('../assets/backimg.png')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/logoait.png')}
                        style={{ width: 200, height: 200 }}
                    />
                </View>
                </View>
            </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        // marginBottom: 100,
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
});

CheckLogin.navigationOptions = () => {
    return {
        header: null
    };
};

export default CheckLogin;