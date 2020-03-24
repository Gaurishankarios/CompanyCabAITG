import React, { Component, useState } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, AsyncStorage, Linking, Platform, Alert } from 'react-native'
// import { AsyncStorage } from 'react-native'
import Spacer from '../components/Spacer'
import { Button, Text, Input } from 'react-native-elements';
import CardView from 'react-native-cardview'
import { navigate } from '../navigationRef'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { call } from 'react-native-reanimated';
import DialogInput from 'react-native-dialog-input';


// import DialogInput from 'react-native-dialog-input-custom';


let tmpstatus = [];
let tmpDrive = [];
let callcount = 1;
let insidentno = 1;


const ListofPD = ({ navigation }) => {
    // const response;

    const [listn, setlistn] = React.useState();
    // const [dlistn, setdlistn] = React.useState();

    const [driven, setdriven] = React.useState();
    const [empID, setempID] = React.useState();
    const [insidnt, setinsidnt] = React.useState();

    const [isDialogVisible, setisDialogVisible] = useState(false);

    if (callcount == 1) {
        // RestCall(setlistn);
    }

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const alldate = month + '/' + date + '/' + year;
    // const alldate = new Date().toLocaleDateString()
    // let date= today.getFullYear()+ "-"+ parseInt(today.getMonth()+1)+"-"+today.getDate() ;
    //    console.log(alldate)
    const [count, setCount] = React.useState(alldate);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    this.state = {
        todayDates: alldate.toString,
    }
    var currentDate = alldate;

    const showDatePicker = () => {
        setDatePickerVisibility(true);


    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);

    };

    const handleConfirm = date => {
        hideDatePicker();
        console.warn("A date has been picked: ", date);

        // this.state.seteditDate = date

        // currentDate = date.toLocaleDateString();
        var dt = new Date(date)
        var date = dt.getDate();
        var month = dt.getMonth() + 1;
        var year = dt.getFullYear();
        currentDate = month + '/' + date + '/' + year;

        setCount(count => currentDate)
        console.log(currentDate);
        // setDatePickerVisibility(false);


    }

    const pickupCall = () => {
        callcount = 1;
        RestCall(setlistn, count, setdriven, setinsidnt);
    }
    const DropupCall = () => {
        callcount = 2;
        console.log('i am in drop method i will pass');
        RestCall(setlistn, count, setdriven, setinsidnt);
    }
    const empPickupPress = (eid) => {
        setisDialogVisible(true);
        setempID(empID => eid);
        console.log(eid);
    }
    const reachEmpLoc = async (eid, ptime) => {
        console.log(eid);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const param = { empAssignedId: eid, rideDate: count, driverAssignedId: "ait306", incidenceId: 1 }

        // console.log(insidnt.incidenceList[0].title);

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        console.log(hours + ':' + min)
        let ctime = (hours + ':' + min)

        if (ptime < ctime) {
            console.log("ctime time is large");
            // setinsidnt(insidnt => response.data)
            // console.log(insidnt);
            const AsyncAlert = async () => new Promise((resolve) => {
                Alert.alert(
                    '',
                    'Select reason',
                    [
                        { text: insidnt.incidenceList[0].title, onPress: () => alertRitch(param,1, headers)},
                        { text: insidnt.incidenceList[1].title, onPress: () => alertRitch(param,2, headers) },
                        { text: insidnt.incidenceList[2].title, onPress: () => alertRitch(param,3, headers) },
                        { text: insidnt.incidenceList[3].title, onPress: () => alertRitch(param,4, headers) },
                        { text: insidnt.incidenceList[4].title, onPress: () => alertRitch(param,5, headers) },
                    ],
                    { cancelable: false }
                )
            });
            await AsyncAlert();
            console.log(param);
        }
        else {
            console.log("picktime time is large");
            const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/reach',
                param,
                headers)

            let coderespo = response.data.status;
            console.log(coderespo);

            if (coderespo == true) {
                alert("Reached at location");
            } else {
                alert("Fail");
            }
        }
    }


    const alertRitch = async(param, insidentno, headers) => {
        // console.log(param.incidenceId);
        param.incidenceId = insidentno;
        console.log(param.incidenceId);

        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/reach',
                param,
                headers)

            let coderespo = response.data.status;
            console.log(coderespo);

            if (coderespo == true) {
                alert("Reached at location");
            } else {
                alert("Fail");
            }
        }
    

    const pinconformPickup = async (pin, id) => {
        setisDialogVisible(false)
        console.log(pin, id);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const param = { employeeId: id, code: pin }
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/code',
            param,
            headers)

        let coderespo = response.data.status;
        console.log(coderespo);

        if (coderespo == true) {
            console.log('condition true');
            alert("Success");
        } else {
            console.log('condition false');

            Alert.alert(
                'Failure',
                'Enter correct code',
                [
                    { text: 'Ok', onPress: () => setisDialogVisible(true) },
                ],
                { cancelable: false }
            )
        }

    }

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


    // console.log(tmpstatus);
    if (callcount == 1) {
        return (
            <View>
                {/* <Text>{currentDate}</Text> */}
                <View style={{ flexDirection: 'row', marginLeft: 10, marginEnd: 10, minwidth: '90%' }} >
                    {/* <Input value={currentDate}
                // onChangeText={seteditDate}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardAppearance={false}
                maxLength={80}
                onTouchStart={showDatePicker}
            /> */}
                    <Button title={count} onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}

                    />
                </View>

                <View style={styles.btnView}>
                    <View style={styles.btnstylebtn}>
                        <Button title='Pick-up' onPress={() => pickupCall()} />
                    </View>
                    <View style={styles.btnstylebtn}>
                        <Button title='Drop' onPress={() => DropupCall()} />
                    </View>
                </View>

                <View>

                    <Text style={{
                        backgroundColor: 'red', alignItems: 'center',
                        fontSize: 19, justifyContent: "center"
                    }}>  {driven}  </Text>
                    {/* <Text style={{
                        backgroundColor: 'red', alignItems: 'center',
                        fontSize: 18, justifyContent: "center"
                    }}>  Ride start time  </Text> */}

                </View>

                <FlatList style={{ marginBottom: 120 }}
                    data={listn}
                    // console.log(data);
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.touchView} onPress={() => { navigate('') }}>
                                <View>
                                    <Text style={styles.textnamestyle}> {item.empAssignedName} - {item.pickLocationName}</Text>
                                    <View style={styles.btnStyle}>
                                        <View style={styles.buttonContainer}>
                                            <View style={{ marginRight: 10 }}>
                                                <Button title='Call' onPress={() => dialCall(item.mobileNumber)} />
                                            </View>

                                            <Button title='Reach' onPress={() => reachEmpLoc(item.empAssignedId, item.pickTime)} />
                                        </View>
                                    </View>

                                    <Text> Pick Time:-{item.pickTime} - Mobile- {item.mobileNumber} </Text>

                                    <View style={styles.btnStyle}>
                                        <View style={styles.buttonContainer}>
                                            <View style={{ marginRight: 10 }}>
                                                <Button title='Cancle' onPress={
                                                    () => { navigate('PCancle', insidnt) }
                                                } />
                                            </View>
                                            <Button title='Pick-up' onPress={() => empPickupPress(item.empAssignedId)} />
                                            <DialogInput isDialogVisible={isDialogVisible}
                                                // title={"Verify code"}
                                                title={empID}
                                                message={"Verify code for employee"}
                                                hintInput={" INPUT"}
                                                textInputProps={{ keyboardType: 'numbers-and-punctuation' }}
                                                submitInput={(inputText) => pinconformPickup(inputText, empID)}
                                                closeDialog={() => { setisDialogVisible(false) }}
                                            ></DialogInput>
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        )
    } else if (callcount == 2) {
        return (
            <View>
                {/* <Text>{currentDate}</Text> */}
                <View style={{ flexDirection: 'row', marginLeft: 10, marginEnd: 10, minwidth: '90%' }} >

                    <Button title={count} onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}

                    />
                </View>



                <View style={styles.btnView}>
                    <View style={styles.btnstylebtn}>
                        <Button title='Pick-up' onPress={() => pickupCall()} />
                    </View>
                    <View style={styles.btnstylebtn}>
                        <Button title='Drop' onPress={() => DropupCall()} />
                    </View>
                </View>

                <View>
                    <Text style={{
                        backgroundColor: 'red', alignItems: 'center',
                        fontSize: 19, justifyContent: "center"
                    }}>  {driven}  </Text>
                </View>


                <FlatList style={{ marginBottom: 120 }}
                    data={listn}
                    // console.log(data);
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.touchView} onPress={() => { navigate('') }}>
                                <View>
                                    <Text style={styles.textnamestyle}> {item.empAssignedName} - {item.dropLocationName}</Text>
                                    <View style={styles.btnStyle}>
                                        <View style={styles.buttonContainer}>
                                            <View style={{ marginRight: 10 }}>
                                                <Button title='Call' onPress={() => dialCall(item.mobileNumber)} />
                                            </View>
                                            <Button title='Drop' />
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }} />



            </View>
        )
    }
};

RestCall = async (setlistn, cdate, setdriven, setinsidnt) => {
    //alert('giiii');
    console.log('date is here ... ', cdate);
    if (callcount == 1) {
        console.log('token is ', await AsyncStorage.getItem('token'));
        // callcount = 2;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        // cdate = '3/18/2020'
        const param = { rideDate: cdate, empAssignedId: "ait306" }
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/picklist',
            param,
            headers)

        console.log(response.data.pickList);
        tmpstatus = response.data.pickList;
        tmpDrive = response.data.vehicleDetails[0].vehicleNumber;
        tmpDrive += "\n Vehicle location-"
        tmpDrive += response.data.vehicleDetails[0].vehicleAddress;
        console.log(tmpDrive[0], tmpstatus);
        setlistn(listn => tmpstatus);
        setdriven(driven => tmpDrive);

        setinsidnt(insidnt => response.data)
        // console.log(setdriven);
    }
    else if (callcount == 2) {
        console.log('i am in drop call');
        tmpstatus = [];
        tmpDrive = [];
        // setlistn(listn => tmpstatus);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        // cdate = '3/18/2020'
        const param = { rideDate: cdate, empAssignedId: "ait306" }
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/droplist',
            param,
            headers)


        tmpstatus = response.data.dropList;
        console.log(tmpstatus);
        setlistn(listn => tmpstatus);

        tmpDrive = response.data.vehicleDetails[0].vehicleNumber;
        tmpDrive += "\n Vehicle location-"
        tmpDrive += response.data.vehicleDetails[0].vehicleAddress;
    }
}

const styles = StyleSheet.create({

    btnView: {
        flexDirection: 'row',
        height: 50,
        // width: 200,
        margin: 2,
        // justifyContent: 'space-evenly',
        // maxWidth: '50%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnstylebtn: {
        maxWidth: '50%',
        margin: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-evenly',
        // width: 800,
        minWidth: '40%'
    },
    touchView: {
        margin: 10,
        marginTop: 10,
        backgroundColor: 'lightgrey',
        // height: 130,
        minHeight: 70,
        maxHeight: 150,
        justifyContent: 'center',
    },
    btnStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        margin: 10,
        marginTop: 20,
        marginBottom: 20,

    },
    buttonContainer: {
        flex: 1,
        height: 35,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // marginRight: 10
    },
    textnamestyle: {
        fontSize: 18
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },


});

export default ListofPD;