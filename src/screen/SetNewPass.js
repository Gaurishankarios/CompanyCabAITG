import React, { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
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
            <Spacer>
                <Text h3>Reset password</Text>
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
                <Button title="Reset password"
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
        const response = await axios.post('http://192.168.1.166:8080/taxicab/login/reset',
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
    },

});

export default SetNewPass;