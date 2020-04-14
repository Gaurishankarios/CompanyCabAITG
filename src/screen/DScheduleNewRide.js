//DScheduleNewRide
import React, { useState, Component } from 'react'
import { View, StyleSheet, TextInput, Dimensions } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment'
import Spacer from '../components/Spacer'
import { Icon } from 'react-native-elements'


const DScheduleNewRide = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const alldate = month + '/' + date + '/' + year;

    const [count, setCount] = React.useState(alldate);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();

        var dt = new Date(date)
        var date = dt.getDate();
        var month = dt.getMonth() + 1;
        var year = dt.getFullYear();

        // let sdate= moment(date).format('DD/MM/YYYY HH:mm')
        var hour = dt.getHours()
        var min = dt.getMinutes()
        currentDate = month + '/' + date + '/' + year + ' Time:-' + hour + ':' + min;
        console.log('date and time is ', currentDate, hour, min)

        setCount(count => currentDate)
    };

    let data = [{ value: 'Pick-up', }, { value: 'Drop', }];

    //Time  picker 



    return (
        // <View>


        <View style={styles.container}>

            <View style={{ margin: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Button title={count} buttonStyle={{ backgroundColor: '#03106E' }} onPress={showDatePicker}
                    icon={{ name: 'event', color: 'white' }} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}

                />
            </View>
            {/* <DatePicker
                mode="time"
                locale="en_GB" // Use "en_GB" here
                date={new Date()}
            /> */}

            <View style={styles.toformtext} >
                <View style={{
                    width: ((Dimensions.get("window").width / 2) - 10),
                    // justifyContent: 'flex-start' 
                }}>
                    <Input
                        labelStyle={{ color: 'grey', fontWeight: 'normal' }}
                        label='From location' //value={employeeId}
                        // onChangeText={setemployeeId}
                        // autoCapitalize='none'
                        autoCorrect={true}
                        maxLength={15}
                    // width={(Dimensions.get("window").width / 2) - 20}
                    />
                </View>
                <View style={{
                    width: ((Dimensions.get("window").width / 2) - 10),
                    justifyContent: 'flex-start'
                }}>
                    <Input
                        labelStyle={{ color: 'grey', fontWeight: 'normal' }}
                        label="To location" //value={employeeId}
                        //onChangeText={setemployeeId}
                        // autoCapitalize='none'
                        autoCorrect={true}
                        maxLength={15}
                    // width={(Dimensions.get("window").width / 2) - 20}
                    />
                </View>
            </View>

            <View style={{ margin: 10 }}>
                <Dropdown
                    label='Ride Type'
                    data={data}
                />
            </View>
            <View style={{ margin: 10 }}>
                <Input
                    labelStyle={{ color: 'grey', fontWeight: 'normal' }}
                    label='Reason for ride' //value={employeeId}
                    // onChangeText={setemployeeId}
                    // autoCapitalize='none'
                    autoCorrect={true}
                    maxLength={15}
                // width={(Dimensions.get("window").width / 2) - 20}
                />
            </View>
            <Spacer>
                <Button  title="Confirm Ride" buttonStyle={{ backgroundColor: '#03106E' }} //onPress={}
                    icon={{ name: 'done', color: 'white', 
                    //type: 'MaterialCommunityIcons'  //airline-seat-recline-normal //baseline-departure-board-black
                     }} />
            </Spacer>


        </View >
        // </View>
    )

}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'flex-start',
        // margin: 10,
        backgroundColor: 'white',
        // marginTop: 40,
    },
    setColorBlue: {
        color: '#03106E'
    },
    toformtext: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        width: '90%'
    },

});

export default DScheduleNewRide;