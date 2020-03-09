import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Spacer from '../components/Spacer'
// import { Button } from 'react-native-elements';
import { Text, Input, Button } from 'react-native-elements'
import { navigate } from '../navigationRef'


const DriverDetail = () => {
    return (
        <ScrollView>
            <Spacer>
                <Text h3>Driver detail</Text>
            </Spacer>
            

            <Spacer>
                <Input label="Type of ride"
                    // onChangeText={setempId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={40}

                />
            </Spacer>

            <Spacer>
                <Input label="Date"
                    // onChangeText={setempId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={40}

                />
            </Spacer>
            <Spacer>
                <Input label="Time"
                    // onChangeText={setempId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={40}

                />
            </Spacer>
            <Spacer>
                <Input label="Vehicle Number"
                    // onChangeText={setempId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={40}

                />
            </Spacer>
            <Spacer>
                <Input label="Seating Capacity"
                    // onChangeText={setempId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={40}

                />
            </Spacer>
            <Spacer>
                <Input label="Route Name"
                    // onChangeText={setempId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={40}

                />
            </Spacer>
            <Spacer>
                <Input label="Ride start from"
                    // onChangeText={setempId}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={40}

                />
            </Spacer>

            <Spacer>
                <Button title="Start ride" 
                onPress={() => {navigate('Detail')} }
                 />
            </Spacer>

        </ScrollView>
    )
};

const styles = StyleSheet.create({

});

export default DriverDetail;