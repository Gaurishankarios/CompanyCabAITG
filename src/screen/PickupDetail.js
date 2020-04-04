import React from 'react'
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity, } from 'react-native'
import Spacer from '../components/Spacer'
import { Text, Input,Button } from 'react-native-elements'
import { navigate } from '../navigationRef'

const PickupDetail = () => {
    const rides = [
        { Name: 'Gaurav Kataria', Pickp: 'Hinjewadi', Mono: '9988776655', Etime: '4:30pm' },
        { Name: 'Neha', Pickp: 'Wakad', Mono: '9988776655', Etime: '4:45pm' },
        { Name: 'Json', Pickp: 'Shivaji-nagar', Mono: '9988776654', Etime: '5:10pm' },
        { Name: 'Shazia', Pickp: 'Shivaji-nagar', Mono: '9988776653', Etime: '5:10pm' },
    ]

    return (
        <FlatList
            data={rides}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={styles.touchView} onPress={() => { navigate('') }}>
                        <View>
                            <Text style={styles.textnamestyle}> {item.Name} - {item.Pickp}</Text>
                            <View style={styles.btnStyle}>
                                <View style={styles.buttonContainer}>
                                    <Button title='Call' />
                                    <Button title='Reach' />
                                </View>
                            </View>

                            <Text> ETA-{item.Etime} - Mobile- {item.Mono} </Text>
                            
                            <View style={styles.btnStyle}>
                                <View style={styles.buttonContainer}>
                                    <Button title='Cancle' />
                                    <Button title='Pick-up' />
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                )
            }} />
    )
}

const styles = StyleSheet.create({
    touchView: {
        margin: 20,
        marginTop: 10,
        backgroundColor: 'lightgrey',
        height: 100,
        justifyContent: 'center',
    },
    btnStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        margin: 10,
    },
    buttonContainer: {
        flex: 1,
        height: 30,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textnamestyle: {
        fontSize: 17
    }
});

export default PickupDetail;