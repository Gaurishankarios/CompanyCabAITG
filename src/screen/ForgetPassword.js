import React, { useState, useContext } from 'react'
import { View, StyleSheet, Alert, Image } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import axios from 'axios'
import { Context as AuthContext } from '../context/AuthContext'
import { navigate } from '../navigationRef'
import FetchingIndicator from 'react-native-fetching-indicator'


const ForgetPassword = ({ navigation }) => {

    const { state, forgot } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [isFetching, setisFetching] = useState(false);

    return (
        
        <View style={styles.container} >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    resizeMode="contain"
                    source={require('../assets/forget.png')}
                    style={{ width: 60, height: 60 }}
                />
            </View>
            <Spacer>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text h4 h4Style={styles.setColorBlue}>Forget Password</Text>
                </View>
            </Spacer>
            <Spacer>
                <Input label="Email" value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={50}

                />
            </Spacer>
            <Spacer>
                <Button title="Send OTP on E-mail" buttonStyle={{ backgroundColor: '#03106E', padding: 15 }} onPress={() => this.showalert(email, setisFetching)} />
            </Spacer>
            <Text style={{ color: 'grey', padding: 15 }} >Enter your email to receive password reset 4 digit OTP</Text>
            {/* <Spacer>
                <Button title="Reset password" onPress={() => navigation.navigate('NewPass')} />
            </Spacer> */}

            <FetchingIndicator isFetching={isFetching} />
        </View>
    )


};

showalert = async (email, setisFetching) => {
    console.log('heyyyyy');
    // setdriven(driven => tmpDrive);
    setisFetching(isFetching => true);

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    const param = { email: email }
    try {
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/login/forgot',
            param,
            headers)
        let tmpstatus = response.data.status;

        console.log(response.data);
        if (tmpstatus == true) {
            setisFetching(isFetching => false);
            Alert.alert(
                'Mailed successfully',
                'Check your mail',
                [
                    { text: 'Reset Password', onPress: () => { navigate('NewPass') } },
                    { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: false }
            )
        } else {
            setisFetching(isFetching => false);
            Alert.alert(
                'Failure',
                'Email doesn\'t exist',
                [
                    { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: false }
            )
        }
        console.log('i am here....');
    } catch (err) {
        setisFetching(isFetching => false);
        console.log("error is ....", err)

    }
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'center',
        margin: 10,
    }, setColorBlue: {
        color: '#03106E'
    }
});

export default ForgetPassword;