import React, {useState} from 'react'
import {View, StyleSheet, Alert} from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'


const ForgetPassword  = ({ navigation }) => {

    const [email, setEmail] = useState('');
    return (
        <View style={styles.container} >
             <Spacer>
                <Text h3>Forget password</Text>
            </Spacer>
            <Spacer>
            <Input label="Email" value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={15}

                />
            </Spacer>
            <Spacer>
                <Button title="Send OTP on mail" onPress = {() => 
                Alert.alert(
                    'Success or error',
                    'Error message or succes msg',
                    [
                      {text: 'Go to SignIn', onPress: () => { navigation.navigate('Signup')}},
                      {text: 'Go to Reset Password', onPress: () => { navigation.navigate('NewPass') }},
                      {text: 'Cancle', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},   
                    ],
                    { cancelable: false }
                  ) } />
            </Spacer>
            <Text style={{color: 'grey', padding: 15}} >Enter official email to receive password reset 4 digit OTP</Text>
            {/* <Spacer>
                <Button title="Reset password" onPress={() => navigation.navigate('NewPass')} />
            </Spacer> */}

        </View>
    )
};
const showalert = () => {
    // console.log('heyyyyy');
    Alert.alert(
        'Success or error',
        'Error message or succes msg',
        [
          {text: 'Go to SignIn', onPress: () => { navigation.navigate('Signup')}},
          {text: 'Go to Reset Password', onPress: () => { navigation.navigate('NewPass') }},
          {text: 'Cancle', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},   
        ],
        { cancelable: false }
      )
};


const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'center',
        margin: 10,
    },
});

export default ForgetPassword;