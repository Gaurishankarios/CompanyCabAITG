import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'

const SetNewPass = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Reset password</Text>
            </Spacer>
            <Spacer>
                <Input label="Employee ID"
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={7}

                />
            </Spacer>
            <Spacer>
                <Input label="OTP or Old Password"
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={6}

                />
            </Spacer>
            <Spacer>
                <Input label="New Password"
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={6}

                />
            </Spacer>
            <Spacer>
            <Button title="Reset password"
                    on onPress={() => { navigation.navigate('Signup') }
                    }
                />
            </Spacer>



        </View>
    )
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'flex-start',
        // marginBottom: 100,
    },

});

export default SetNewPass;