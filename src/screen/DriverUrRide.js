import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'

const DriverUrRide = () => {
    return (
        // <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', minwidth: '90%', }} >


        //     {/* <DateTimePickerModal
        //         isVisible={isDatePickerVisible}
        //         mode="date"
        //         onConfirm={handleConfirm}
        //         onCancel={hideDatePicker}

        //     /> */}
        // </View>

        <View style={styles.btnView}>
            <Button title="Date"
                buttonStyle={{ backgroundColor: '#03106E', padding: 8 }} //onPress={showDatePicker}
                icon={{ name: 'event', color: 'white' }}
            />
            <View style={styles.btnstylebtn}>
                <Button title='Pick-up' //onPress={() => pickupCall()} 
                />
            </View>
            <View style={styles.btnstylebtn}>
                <Button title='Drop' //onPress={() => DropupCall()} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnView: {
        flexDirection: 'row',
        height: 50,
        marginTop: 5,
        // width: 200,
        margin: 2,
        // justifyContent: 'space-evenly',
        // maxWidth: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    btnstylebtn: {
        maxWidth: '40%',
        margin: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-evenly',
        // width: 800,
        minWidth: '25%'
    },
});

export default DriverUrRide;