import React, { useState, useContext } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import axios from 'axios'
import { Context as AuthContext } from '../context/AuthContext'
import { navigate } from '../navigationRef'


const ForgetPassword = ({ navigation }) => {

    const { state, forgot } = useContext(AuthContext);
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
                    maxLength={50}

                />
            </Spacer>
            <Spacer>
                <Button title="Send OTP on mail" onPress={() => this.showalert(email)} />
            </Spacer>
            <Text style={{ color: 'grey', padding: 15 }} >Enter official email to receive password reset 4 digit OTP</Text>
            {/* <Spacer>
                <Button title="Reset password" onPress={() => navigation.navigate('NewPass')} />
            </Spacer> */}

        </View>
    )


};

 showalert = async (email) => {
    console.log('heyyyyy');
    


   // console.log("here i am", email);
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    const param = { email: email }
    try {
        const response = await axios.post('http://192.168.1.166:8080/taxicab/login/forgot', 
        param,
         headers)
         let tmpstatus = response.data.status;
         
        console.log(response.data);
        if(tmpstatus == true){
            Alert.alert(
                    'Mailed successfully',
                    'Check your mail',
                    [
                      {text: 'Reset Password', onPress: () => { navigate('NewPass') }},
                      {text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},   
                    ],
                    { cancelable: false }
                  )
        }else{
            Alert.alert(
                'Failure',
                'Email doesn\'t exist' ,
                [
                  {text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},   
                ],
                { cancelable: false }
              )
        }
        console.log('i am here....');
    }catch (err) {
        console.log("error is ....", err)

    }
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'center',
        margin: 10,
    },
});

export default ForgetPassword;