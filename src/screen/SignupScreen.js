import React, { useState, useContext, Component } from 'react'
import { View, StyleSheet, ImageBackground, Image } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import { AsyncStorage } from 'react-native'


let check = 2;
const SignupScreen = ({ navigation }) => {

    const { state, signup } = useContext(AuthContext);
    const [employeeId, setemployeeId] = useState('');
    const [password, setPassword] = useState('');

    console.log(state);
    // async () => {
    //     await AsyncStorage.getItem('token')
    //     console.log("token check: ", AsyncStorage.getItem('token'))
    // }

    return (
        <ImageBackground source={require('../assets/backimg.png')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/logoait.png')}
                        style={{ width: 100, height: 100 }}
                    />
                </View>

                <Spacer>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <Text h4
                            h4Style={{ color: 'white' }}>Sign-in for AIT Portal</Text>
                    </View>
                </Spacer>
                <Spacer>
                    <Input
                        labelStyle={{ color: 'white', fontWeight: 'normal' }}
                        label="Employee ID" value={employeeId}
                        onChangeText={setemployeeId}
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={15}
                    />
                </Spacer>
                <Spacer>
                    <Input
                        labelStyle={{ color: 'white', fontWeight: 'normal' }}
                        secureTextEntry
                        label="Password" value={password}
                        onChangeText={setPassword}
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={8}

                    />
                </Spacer>
                {state.errorMessage ? <Text style={styles.errorMessag} > {state.errorMessage} </Text> : null}

                <Spacer>
                    <Button title="Sign-in" buttonStyle={{ backgroundColor: '#03106E', padding: 15 }}
                        onPress={() => signup({ employeeId, password })} />
                </Spacer>
                <Spacer>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={styles.TextStyle} onPress={() => { navigation.navigate('Forget') }}> Forget Password</Text>

                        <Text style={styles.TextStyle} onPress={() => { navigation.navigate('NewPass') }}> Set New Password</Text>
                    </View>
                </Spacer>
            </View>

            {/* <Spacer>
             <Button
                        raised
                        icon={{ name: 'call', color: 'red'}}
                        title='BUTTON'
                        // width='20%'
                        buttonStyle={{ backgroundColor: '#03106E'}}
                         />
                </Spacer> */}
            <Button
                icon={{
                    name: "call",
                    color: "red"
                }}
                title="Button"
            />
        </ImageBackground>

    )
};



SignupScreen.navigationOptions = () => {
    return {
        header: null
    };
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
    errorMessag: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    forget: {
        // flex
        justifyContent: 'space-around'
    },
    TextStyle: {

        color: '#FF8001',
        textDecorationLine: 'underline'

    }
});

export default SignupScreen;

