import React, { useState } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Linking, AsyncStorage } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios'
import { navigate } from '../navigationRef'

let rideTypePD = 0;
const EmpUrRide = () => {
    let tokedId = 0;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isAllButtonVisible, setisAllButtonVisible] = useState(false);

    const [isPick, setisPick] = useState("#03106E");
    const [isDrop, setisDrop] = useState("#03106E");
    const [newList, setnewList] = useState();

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const alldate = month + '/' + date + '/' + year;
    const [count, setCount] = React.useState(alldate);


    
    // let listn = [
    //     {
    //         Date: "15-12-2020",
    //         Time: "17:50",
    //         DriverName: "XYZ",
    //         PickLocation: "location name",
    //         VehicleNo: "number mention",
    //         mobileNumber: "7030748391",
    //         Pin: 1234,
    //         Status: "Pending",
    //     }
    // ]

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();

        let compdate = new Date()
        if (date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }) >= compdate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' })) {
            setisAllButtonVisible(isAllButtonVisible => false)
            console.log("selected date greater or equal to today", isAllButtonVisible);
        } else {
            setisAllButtonVisible(isAllButtonVisible => true)
            console.log("selected date less than to today", isAllButtonVisible);
        }

        var dt = new Date(date)
        var date = dt.getDate();
        var month = dt.getMonth() + 1;
        var year = dt.getFullYear();
        // var hour = dt.getHours()
        // var min = dt.getMinutes()
        // var sec = dt.getSeconds()
        currentDate = month + '/' + date + '/' + year;

        setisPick(isPick => "#03106E");
        setisDrop(isDrop => "#03106E");

        setCount(count => currentDate)
        setnewList(newList => []);


    };

    const dialCall = (mobileNo) => {
        console.log(mobileNo);
        // let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${mobileNo}`;
            console.log(phoneNumber);
        }
        else {
            phoneNumber = `telprompt:${mobileNo}`;
        }

        Linking.openURL(phoneNumber);

    }

    const pickupCall = async (typrid) => {
        setnewList(newList => []);
        tokedId = await AsyncStorage.getItem('token');
        console.log('token is ', tokedId);


        console.log("type id is :-", typrid);
        rideTypePD = typrid;
        console.log("rideTypePD id is :-", rideTypePD);

        if (typrid == 1) {
            setisPick(isPick => "orange");
            setisDrop(isDrop => "#03106E");
        } else if (typrid == 2) {
            setisPick(isPick => "#03106E");
            setisDrop(isDrop => "orange");
        }


        // RestCall(setlistn, count, setdriven, setinsidnt, setisFetching);
        // console.log('token is ', await AsyncStorage.getItem('token'));
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        const param = { rideDate: count, driverAssignedId: tokedId, rideType: rideTypePD }
        console.log(param)
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/employee/list',
            param,
            headers)

        // setisFetching(isFetching => false);
        console.log(response.data.employeeDetails);
        console.log(response.data);

        setnewList(newList => response.data.employeeDetails);


    }


    return (
        <View>

            <View style={styles.btnView}>
                <Button title={count} buttonStyle={{ backgroundColor: '#03106E' }} onPress={showDatePicker}
                    icon={{ name: 'event', color: 'white' }} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}

                />
                <View style={styles.btnstylebtn}>
                    <Button title='Pick-up' buttonStyle={{ backgroundColor: isPick }} onPress={() => pickupCall(1)}
                    />
                </View>
                <View style={styles.btnstylebtn}>
                    <Button title='Drop' buttonStyle={{ backgroundColor: isDrop }} onPress={() => pickupCall(2)}
                    />
                </View>
            </View>

            <View>
                <FlatList style={{ marginBottom: 130 }}
                    data={newList}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={(item.status == "Completed") ? styles.touchViewD : styles.touchView} //style={styles.touchView} 
                                onPress={() => { navigate('') }}
                                disabled={true} >
                                <View >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={styles.textnamestyle}>Status:- </Text>
                                            <Text style={styles.textnamestyle1}>{item.status}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={styles.textnamestyle}>OTP:</Text>
                                            <Text style={styles.textnamestyle1}>{item.otp}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={styles.textnamestyle}>Time:- </Text>
                                            <Text style={styles.textnamestyle1}>{item.rideTime}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={styles.textnamestyle}>Logsheet No:</Text>
                                            <Text style={styles.textnamestyle1}>xxxx</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={styles.textnamestyle}>Driver Name:- </Text>
                                        <Text style={styles.textnamestyle1}>{item.driverAssignedName}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={styles.textnamestyle}>Location:- </Text>
                                        <Text style={styles.textnamestyle1}>{item.location}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={styles.textnamestyle}>Vehicle No:- </Text>
                                        <Text style={styles.textnamestyle1}>{item.vehicleNumber}</Text>
                                    </View>

                                    <View style={styles.btnStyle}>
                                        <View style={styles.buttonContainerDrop}>
                                            {/* <Text style={styles.textnamestyle1}>{item.dropTime}</Text> */}
                                            {/* <View style={{ marginRight: 10, marginLeft: 20 }}> */}
                                            {isAllButtonVisible ? null : <Button title='Call' icon={{ name: 'call', color: 'white' }} onPress={() => dialCall(item.mobileNumber)} 
                                            disabled={(item.status == "Completed") ? true : false} /> }
                                            {/* </View> */}
                                            {/* <View style={{ marginRight: 10, marginLeft: 20 }}> */}
                                            {isAllButtonVisible ? null : <Button title='Cancel' icon={{ name: 'cancel', color: 'white' }} onPress={ () => { navigate('PCancle', [item.driverAssignedId, count, "fromE",rideTypePD,item.rideId])}}
                                              disabled={(item.status == "Completed") ? true : false} />}
                                            {/* </View> */}
                                            {/* <Button title='  Done  ' //disabled={isAllButtonVisible} //onPress={() => dropEmp(item.empAssignedId)}
                                            /> */}


                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnView: {
        flexDirection: 'row',
        height: 50,
        margin: 10,

        // width: 200,
        // margin: 2,
        // justifyContent: 'space-evenly',
        // maxWidth: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white',

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

    btnstylebtn: {
        maxWidth: '40%',
        margin: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-evenly',
        // width: 800,
        minWidth: '25%'
    },
    touchView: {
        margin: 3,
        marginHorizontal: 10,
        // marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        // height: 130,
        minHeight: 70,
        maxHeight: 180,
        justifyContent: 'center',
        opacity: 1,
    },
    touchViewD: {
        margin: 3,
        marginHorizontal: 10,
        // marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        // height: 130,
        minHeight: 70,
        maxHeight: 180,
        justifyContent: 'center',
        opacity: 0.7,
    },
    btnStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // height: 40,
        // margin: 10,
        marginTop: 20,
        marginBottom: 20,

    },
    buttonContainer: {
        flex: 1,
        height: 40,
        // margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // marginRight: 10
    },
    buttonContainerDrop: {
        flex: 1,
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
        // marginRight: 10
    },
    textnamestyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#03106E',
        padding: 2,
    },
    textnamestyle1: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#FF8001',
        padding: 2,
        alignItems: 'flex-end'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default EmpUrRide;