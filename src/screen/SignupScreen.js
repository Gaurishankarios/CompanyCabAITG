import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'

const SignupScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext);
    const [employeeId, setemployeeId] = useState('');
    const [password, setPassword] = useState('');

    console.log(state);
    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>SignIn for Ait</Text>
            </Spacer>
            <Spacer>
                <Input label="EmployeeID" value={employeeId}
                    onChangeText={setemployeeId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={15}

                />
            </Spacer>
            <Spacer>
                <Input
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
                <Button title="Sign Up" onPress={() => signup({ employeeId, password })} />
            </Spacer>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <Button title="forget password"
                    on onPress={() => { navigation.navigate('Forget') }
                    }
                />
                <Button title="Set New Password"
                onPress={() => {navigation.navigate('NewPass')} } />
            </View>
        </View>

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
    errorMessag: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    forget: {
        // flex
        justifyContent: 'space-around'
    }
});
export default SignupScreen;

