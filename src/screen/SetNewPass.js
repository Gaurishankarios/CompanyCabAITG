import React, { useState } from 'react'
import { View, StyleSheet, Alert,Image } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import axios from 'axios'
import { navigate } from '../navigationRef'


const SetNewPass = ({ navigation }) => {

    const [empId, setempId] = useState('');
    const [oneTime, setoneTime] = useState('');
    const [newpass, setnewPass] = useState('');

    return (
        <View style={styles.container}>

<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image 
                        resizeMode="contain"
                        source={require('../assets/newpass.png')}
                        style={{ width: 80, height: 80 }}
                    />
                </View>
            <Spacer>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text h4 h4Style={styles.setColorBlue}>Reset Password</Text>
                </View>
            </Spacer>
            <Spacer>
                <Input label="Employee ID" value={empId}
                    onChangeText={setempId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={7}

                />
            </Spacer>
            <Spacer>
                <Input
                    secureTextEntry
                    label="OTP or Old Password" value={oneTime}
                    onChangeText={setoneTime}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={8}

                />
            </Spacer>
            <Spacer>
                <Input
                    secureTextEntry
                    label="New Password" value={newpass}
                    onChangeText={setnewPass}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={8}

                />
            </Spacer>
            <Spacer>
                <Button title="Reset Password" buttonStyle={{ backgroundColor: '#03106E',padding:15}}
                    on onPress={() => this.servercall(empId, oneTime, newpass)
                    }
                />
            </Spacer>



        </View>
    )
};

servercall = async (empId, oneTime, newpass) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    const param = { employeeId: empId, passkey: oneTime, newPasskey: newpass }
    console.log(param);
    try {
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/login/reset',
            param,
            headers)
        let tmpstatus = response.data.status;
        console.log(tmpstatus);
        if (tmpstatus == true) {
            Alert.alert(
                'Password reset',
                'Successfully',
                [
                    { text: 'OK', onPress: () => { navigate('Signup') } },
                    
                ],
                { cancelable: false }
            )
        } else {
            Alert.alert(
                'Failure',
                'Password reset denied',
                [
                    { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: false }
            )
        }
    } catch (err) {
        console.log(err);
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'flex-start',
        // marginBottom: 100,
    },setColorBlue :{
        color: '#03106E'
      }

});

export default SetNewPass;