//DriverBillUp
import React, { useState } from 'react'
import { View, StyleSheet, Alert, Image , AsyncStorage} from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'



const DriverBillUp = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Spacer>
                <Input label="Enter Amount" //value={empId}
                    // onChangeText={setempId}
                    // autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={7}
                />
            </Spacer>
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
            {/* <Spacer> */}
                <Image
                    style = {{ width: 150, height: 150, alignItems: 'center', //alignSelf: 'stretch', 
                }}
                    source={require('../assets/upload.png')}
                />
            {/* </Spacer> */}
            </View>

            <Spacer>
                <Button title="Select file to upload"/>
            </Spacer>
        </View>
    )

}

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

export default DriverBillUp;