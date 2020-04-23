//DScheduleNewRide
import React, { useState, Component } from 'react'
import { View, StyleSheet, TextInput, Dimensions, Alert, AsyncStorage } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment'
import Spacer from '../components/Spacer'
import { Icon } from 'react-native-elements'
import axios from 'axios';
import { navigate } from '../navigationRef'


const DScheduleNewRide = ({navigation}) => {

    let tokenId=0;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [rideType, setrideType] = useState();
    const [Reason, setReason] = useState('')
    const [fromLoc, setfromLoc] = useState('')
    const [toLoc, settoLoc] = useState('')

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const alldate = month + '/' + date + '/' + year;

    const [count, setCount] = React.useState(alldate);
    const [timecall, settimecall] = React.useState('');
    const [datecall, setdatecall] = React.useState();

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

        let sdate= month + '/' + date + '/' + year;
        var hour = dt.getHours()
        var min = dt.getMinutes()
        var sec = dt.getSeconds()
        currentDate = month + '/' + date + '/' + year + ' Time:-' + hour + ':' + min;
        let timepass = hour + ':' + min + ':' + sec;
        console.log('date and time is ', currentDate)
        console.log("time is :-", timepass)

        setCount(count => currentDate)
        settimecall(timecall => timepass)
        setdatecall(datecall => sdate)
    };

    let data = [{ value: 'Pick-up', }, { value: 'Drop', }];
    let dataReason = [{ value: 'Emergency', }, { value: 'Official', }];

    //Time  picker 

    const selectNewRideCall = async () => {
        tokedId=await AsyncStorage.getItem('token');
        console.log('token is ', tokedId);
        let rideint = 0;
        if (rideType == "Pick-up") {
            rideint = 1;
        } else if (rideType == "Drop") {
            rideint = 2;
        }
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        if(fromLoc=="" || toLoc=='' || timecall=='' || rideType<1 || Reason=='' ){
            console.log("Do not call");
            alert('Select Date and time and fill all field')
        }else{

            const param = {
                pickLocationName: fromLoc,
                dropLocationName: toLoc,
                rideDate: datecall,
                rideType: rideint,
                scheduleReason: Reason,
                empAssignedId: tokedId,
                rideTime: timecall,
            }
            console.log(param);
    
            const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/schedule',
                param,
                headers)
    
            let coderespo = response.data.status;
            console.log(coderespo);
            if (coderespo == true) {
                // setisFetching(isFetching => false);
                Alert.alert(
                    'Sent Request',
                    'Sent request for aprroval',
                    [
                        { text: 'Ok', onPress: () => navigation.pop(), style: 'cancel' },
                    ],
                    { cancelable: false }
                )
            }else{
                // setisFetching(isFetching => false);
                Alert.alert(
                    'Failure',
                    'Something went wrong',
                    [
                        { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    ],
                    { cancelable: false }
                )
            }
    
        }

      

    }




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


            <View style={styles.toformtext} >
                <View style={{
                    width: ((Dimensions.get("window").width / 2) - 10),
                    // justifyContent: 'flex-start' 
                }}>
                    <Input
                        labelStyle={{ color: 'grey', fontWeight: 'normal' }}
                        label='From location' value={fromLoc}
                        onChangeText={setfromLoc}
                        // autoCapitalize='none'
                        autoCorrect={true}
                        maxLength={15}
                    />
                </View>
                <View style={{
                    width: ((Dimensions.get("window").width / 2) - 10),
                    justifyContent: 'flex-start'
                }}>
                    <Input
                        labelStyle={{ color: 'grey', fontWeight: 'normal' }}
                        label="To location" value={toLoc}
                        onChangeText={settoLoc}
                        // autoCapitalize='none'
                        autoCorrect={true}
                        maxLength={15}
                    />
                </View>
            </View>

            <View style={{ margin: 10 }}>
                <Dropdown
                    label='Ride Type'
                    data={data}
                    onChangeText={setrideType}
                />
            </View>
            <View style={{ margin: 10 }}>

                <Dropdown
                    label='Choose Reason'
                    data={dataReason}
                    onChangeText={setReason}
                />
            </View>
            <Spacer>
                <Button title="Send For Approvel" buttonStyle={{ backgroundColor: '#03106E' }} onPress={selectNewRideCall}
                    icon={{
                        name: 'done', color: 'white',
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