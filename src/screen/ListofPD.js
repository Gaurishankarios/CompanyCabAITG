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
import { HeaderTitle } from 'react-navigation-stack';
import FetchingIndicator from 'react-native-fetching-indicator'
import { bool } from 'prop-types';


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
    const [isAllButtonVisible, setisAllButtonVisible] = useState(false);

    const [isFetching, setisFetching] = useState(false);


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
        let compdate = new Date()
        console.log("current date is ", compdate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }))

        if (date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }) >= compdate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' })) {
            // setisButtonVisible(true);
            setisAllButtonVisible(isAllButtonVisible => false)
            console.log("selected date greater or equal to today", isAllButtonVisible);
        } else {
            // setisButtonVisible(false);
            setisAllButtonVisible(isAllButtonVisible => true)
            console.log("selected date less than to today", isAllButtonVisible);
        }

        setlistn(listn => []);
        setdriven(driven => []);
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
        RestCall(setlistn, count, setdriven, setinsidnt, setisFetching);
    }
    const DropupCall = () => {
        callcount = 2;
        console.log('i am in drop method i will pass');
        RestCall(setlistn, count, setdriven, setinsidnt, setisFetching);
    }
    const empPickupPress = (eid) => {
        setisDialogVisible(true);
        setempID(empID => eid);
        console.log(eid);
    }

    const dropEmp = async (emid) => {
        setisFetching(isFetching => true);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const param = { empAssignedId: emid, rideDate: count, driverAssignedId: "ait306" }

        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/dropreach',
            param,
            headers)

        let coderespo = response.data.status;
        console.log(coderespo);

        if (coderespo == true) {
            setisFetching(isFetching => false);
            alert("Reached at location");
        } else {
            setisFetching(isFetching => false);
            alert("Fail");
        }

    }

    const reachEmpLoc = async (eid, ptime) => {
        setisFetching(isFetching => true);
        console.log(eid);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const param = { empAssignedId: eid, rideDate: count, driverAssignedId: "ait306", incidenceId: 1 }

        // console.log(insidnt.incidenceList[0].title);

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        min = min > 9 ? min : '0' + min;
        var sec = new Date().getSeconds(); //Current Seconds
        console.log(hours + ':' + min)
        let ctime = (hours + ':' + min)



        if (ptime < ctime) {
            setisFetching(isFetching => false);
            console.log("ctime time is large");
            // setinsidnt(insidnt => response.data)

            // const AsyncAlert = async () => new Promise((resolve) => {
            //     Alert.alert(
            //         '',
            //         'Select reason',
            //         [
            //             { text: insidnt.incidenceList[0].title, onPress: () => alertRitch(param,1, headers)},
            //             { text: insidnt.incidenceList[1].title, onPress: () => alertRitch(param,2, headers) },
            //             { text: insidnt.incidenceList[2].title, onPress: () => alertRitch(param,3, headers) },
            //             { text: insidnt.incidenceList[3].title, onPress: () => alertRitch(param,4, headers) },
            //             { text: insidnt.incidenceList[4].title, onPress: () => alertRitch(param,5, headers) },
            //         ],
            //         { cancelable: false }
            //     )
            // });
            // await AsyncAlert();
            console.log(param);
            navigate('LReach', param);
        }
        else {
            console.log("picktime time is large");
            const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/reach',
                param,
                headers)

            let coderespo = response.data.status;
            console.log(coderespo);

            setisFetching(isFetching => false);
            if (coderespo == true) {
                alert("Reached at location");
            } else {
                alert("Fail");
            }
        }
    }


    const alertRitch = async (param, insidentno, headers) => {
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


    if (callcount == 1) {
        return (
            <View>
                {/* <Text>{currentDate}</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', minwidth: '90%', }} >


                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}

                    />
                </View>

                <View style={styles.btnView}>
                    <Button title={count}
                        buttonStyle={{ backgroundColor: '#03106E', padding: 8 }} onPress={showDatePicker}
                        icon={{ name: 'event', color: 'white' }}
                    />
                    <View style={styles.btnstylebtn}>
                        <Button title='Pick-up' onPress={() => pickupCall()} />
                    </View>
                    <View style={styles.btnstylebtn}>
                        <Button title='Drop' onPress={() => DropupCall()} />
                    </View>
                </View>

                <View style={{
                    backgroundColor: '#6A7FB4', alignItems: 'center',
                    justifyContent: "center", marginHorizontal: 10, marginVertical: 5
                }}>
                    {/* <Text style={{
                        fontSize: 18,
                        textAlign: 'auto',
                        color: 'white',
                        }}>Date is- {count}
                    </Text> */}
                    <Text style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'white',
                    }}>  {driven}  </Text>
                </View>
                {/* <View>

                    <Text style={{
                        backgroundColor: '#6A7FB4', alignItems: 'center',
                        fontSize: 19, justifyContent: "center"
                    }}>  {driven}  </Text>

                </View> */}

                <FlatList style={{ marginBottom: 120 }}
                    data={listn}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.touchView} onPress={() => { navigate('') }}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.textnamestyle}> {item.empAssignedName} </Text>
                                        <Text style={styles.textnamestyle}>Pick Time</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <Text style={styles.textnamestyle1}> {item.pickLocationName} </Text>
                                        <Text style={styles.textnamestyle1}>{item.pickTime}</Text>
                                    </View>

                                    {/* - {item.pickLocationName} */}


                                    {/* <Text style={{ padding: 5 }}> Pick Time:-{item.pickTime}  </Text> */}

                                    <View style={styles.btnStyle}>
                                        <View style={styles.buttonContainer} >
                                            <View style={{ marginRight: 5 }}>
                                                <Button title='Reach' disabled={isAllButtonVisible} onPress={() => reachEmpLoc(item.empAssignedId, item.pickTime)} />
                                            </View>
                                            <View style={{ marginRight: 5 }}>
                                                <Button title='' icon={{ name: 'call', color: 'white' }} disabled={isAllButtonVisible} onPress={() => dialCall(item.mobileNumber)} />
                                            </View>
                                            <View style={{ marginRight: 5 }}>
                                                <Button title='' icon={{ name: 'cancel', color: 'white' }} disabled={isAllButtonVisible} onPress={
                                                    () => { navigate('PCancle', [item.empAssignedId, count]) }
                                                } />
                                            </View>
                                            <Button title='Pick-up' disabled={isAllButtonVisible} onPress={() => empPickupPress(item.empAssignedId)} />

                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                <DialogInput isDialogVisible={isDialogVisible}
                    title={empID}
                    message={"Verify code for employee"}
                    hintInput={" INPUT"}
                    textInputProps={{ keyboardType: 'numbers-and-punctuation' }}
                    submitInput={(inputText) => pinconformPickup(inputText, empID)}
                    closeDialog={() => { setisDialogVisible(false) }}
                ></DialogInput>

                <FetchingIndicator isFetching={isFetching} />
            </View>
        )
    } else if (callcount == 2) {
        return (
            <View>
                {/* <Text>{currentDate}</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', minwidth: '90%', }} >

                    {/* <Button title={count} buttonStyle={{ backgroundColor: '#03106E', padding: 10, width: 200 }} onPress={showDatePicker} /> */}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}

                    />
                </View>

                <View style={styles.btnView}>
                    <Button title={count}
                        buttonStyle={{ backgroundColor: '#03106E', padding: 8 }} onPress={showDatePicker}
                        icon={{ name: 'event', color: 'white' }}
                    />
                    <View style={styles.btnstylebtn}>
                        <Button title='Pick-up' onPress={() => pickupCall()} />
                    </View>
                    <View style={styles.btnstylebtn}>
                        <Button title='Drop' onPress={() => DropupCall()} />
                    </View>
                </View>

                <View style={{
                    backgroundColor: '#6A7FB4', alignItems: 'center',
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'white',
                    }}>  {driven}  </Text>
                </View>


                <FlatList style={{ marginBottom: 120 }}
                    data={listn}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.touchView} onPress={() => { navigate('') }}>
                                <View >
                                    {/* <Text style={styles.textnamestyle}> {item.empAssignedName} - {item.dropLocationName}</Text> */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.textnamestyle}> {item.empAssignedName} </Text>
                                        <Text style={styles.textnamestyle}>{item.dropLocationName}</Text>
                                    </View>
                                    <View style={styles.btnStyle}>
                                        <View style={styles.buttonContainerDrop}>
                                            <Text style={styles.textnamestyle1}>{item.dropTime}</Text>
                                            <View style={{ marginRight: 10, marginLeft: 20 }}>
                                                <Button title='' icon={{ name: 'call', color: 'white' }} disabled={isAllButtonVisible} onPress={() => dialCall(item.mobileNumber)} />
                                            </View>
                                            <Button title='Drop' disabled={isAllButtonVisible} onPress={() => dropEmp(item.empAssignedId)} />
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                <FetchingIndicator isFetching={isFetching} />
            </View>
        )
    }

};
// ListofPD.navigationOptions = ({navigation}) => {
//     return {
//         headerRight: <Button title={"abc"} onPress={showDatePicker} />
//     };
// };
ListofPD.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    console.log("i am inside navigation", params)
    return {
        title: null,
        // headerRight: () => (

        // <Button title="test" />
        // <Button title={this.count} buttonStyle={{ backgroundColor: '#03106E', padding: 2, width: 200, height: 30 }}   />
        // {new Date().toLocaleDateString()}
        // )
        // headerRight: <Button
        //                      title="Refresh"
        //                      onPress={ () => {params.showDatePicker} } />


    };


};



RestCall = async (setlistn, cdate, setdriven, setinsidnt, setisFetching) => {
    console.log('date is here ... ', cdate);

    setisFetching(isFetching => true);
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

        setisFetching(isFetching => false);
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


        setisFetching(isFetching => false);
        tmpstatus = response.data.dropList;
        console.log(tmpstatus);
        setlistn(listn => tmpstatus);

        tmpDrive = response.data.vehicleDetails[0].vehicleNumber;
        tmpDrive += "\n Vehicle location-"
        tmpDrive += response.data.vehicleDetails[0].vehicleAddress;
        setdriven(driven => tmpDrive);


    }
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
        maxHeight: 150,
        justifyContent: 'center',
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
        justifyContent: 'flex-end',
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

export default ListofPD;