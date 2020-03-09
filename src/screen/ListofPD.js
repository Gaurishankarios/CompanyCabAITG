import React, { Component, useState } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Spacer from '../components/Spacer'
import { Button, Text } from 'react-native-elements';
import CardView from 'react-native-cardview'
import { navigate } from '../navigationRef'
import DateTimePickerModal from "react-native-modal-datetime-picker";


const ListofPD = ({ navigation }) => {

    const rides = [
        { ridetype: 'Pick-up', numberE: '5', date: '01-March', route: 'Dhanawadi', time: '5:30pm' },
        { ridetype: 'Drop', numberE: '5', date: '02-March', route: 'Dhanawadi', time: '2:30am' },
        { ridetype: 'Pick-up', numberE: '5', date: '02-March', route: 'Dhanawadi', time: '5:30pm' },
        { ridetype: 'Pick-up', numberE: '5', date: '03-March', route: 'Dhanawadi', time: '5:30pm' },
        { ridetype: 'Pick-up', numberE: '5', date: '4-March', route: 'Dhanawadi', time: '5:30pm' }
    ];

    console.log('heyyyyy');

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    console.log(date + '-' + month + '-' + year);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    }

    return (
        <View>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        
        <FlatList
            data={rides}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={styles.touchView} onPress={() => { navigate('Ddetail') }}>
                        <View>
                            <Text h4> {item.ridetype}</Text>
                            <Text>  Date-{item.date} - Time- {item.time} </Text>
                            {/* <Text></Text> */}
                            <Text>  Route-{item.route} - No {item.numberE}</Text>
                            {/* <Text> {item.ridetype} - No {item.numberE}
                            --Date-{item.date}
                            --Time- {item.time}
                            --Route-{item.route}
                        </Text> */}
                        </View>

                    </TouchableOpacity>
                )
            }} />
            </View>
    )
};

const styles = StyleSheet.create({
    touchView: {
        margin: 20,
        marginTop: 10,
        backgroundColor: 'lightgrey',
        height: 80,
        justifyContent: 'center',
    }

});

export default ListofPD;