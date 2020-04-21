import React, { useState } from 'react'
import { View, StyleSheet, Alert, Image, ScrollView , KeyboardAvoidingView} from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import axios from 'axios'
import { navigate } from '../navigationRef'
import FetchingIndicator from 'react-native-fetching-indicator'
import PassMeter from "react-native-passmeter";
import { HeaderBackButton } from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const SetNewPass = ({ navigation }) => {

    const [empId, setempId] = useState('');
    const [oneTime, setoneTime] = useState('');
    const [newpass, setnewPass] = useState('');
    const [isFetching, setisFetching] = useState(false);

    const MAX_LEN = 8,
        MIN_LEN = 4,
        PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];


    return (
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
            <View style={styles.container}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        resizeMode="contain"
                        source={require('../assets/newpass.png')}
                        style={{ width: 60, height: 60 }}
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
                {/* <Spacer> */}
                <PassMeter
                    showLabels
                    password={newpass}
                    maxLength={MAX_LEN}
                    minLength={MIN_LEN}
                    labels={PASS_LABELS}
                />
                {/* </Spacer> */}
                <Spacer>
                    <Button title="Reset Password" buttonStyle={{ backgroundColor: '#03106E', padding: 15 }}
                        on onPress={() => this.servercall(empId, oneTime, newpass, setisFetching)
                        }
                    />
                </Spacer>

                <FetchingIndicator isFetching={isFetching} />

            </View>
          </KeyboardAwareScrollView>
    )
};

servercall = async (empId, oneTime, newpass, setisFetching) => {

    if (newpass.indexOf(' ') !== -1) {
        alert("White Space not allowed in password ");
    } else if (newpass.length <= 3) {
        alert("password must contains 4 characters")
    } else {



        setisFetching(isFetching => true);
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
                setisFetching(isFetching => false);
                Alert.alert(
                    'Password reset',
                    'Successfully',
                    [
                        { text: 'OK', onPress: () => { navigate('Signin') } },

                    ],
                    { cancelable: false }
                )
            } else {
                setisFetching(isFetching => false);
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
            setisFetching(isFetching => false);
            console.log(err);
        }
    }
}

// SetNewPass.navigationOptions = () => {
//     return {
//         // headert: ,
//         navigationOptions: {
//        headerBackTitle: 'Back'
//      }
//     };
// };

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'center',
        // marginBottom: 100,
        marginTop: 20,
    }, setColorBlue: {
        color: '#03106E'
    }

});

export default SetNewPass;