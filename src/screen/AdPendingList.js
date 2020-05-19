import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import axios from 'axios';


let appcall = 1;
const AdPendingList = ({ navigation }) => {

    useEffect(() =>{
        datacall();
    },[]);
  

    const [listemp, setlistemp] = useState([]);
    

    // {datacall};
   

    const datacall = async () => {
        console.log('here i am');

        const response = await axios.get('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/admin/fetchDetails')
            // .then(res => {
                let coderespo = response.data.pendingList;
                console.log(coderespo);

                setlistemp(listemp => coderespo)
            // })
    }

    const rideAprove = async(tmp) => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const param = { vehicleId: 1, driverId: 14, status: "Approved", rideId: tmp }
        // const param = { rideId: dropid }
        console.log("dropid is ", tmp)
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/admin/manipulate',
            param,
            headers)

        let coderespo = response.data.status;
        console.log(coderespo);
        if(coderespo==true){
            datacall();
        }
    }

    if (appcall == 1) {
        appcall++;
        console.log('here i am');
        // {() => datacall('abc')};
        datacall();
    }


    return (
        <View style={styles.container}>
        <FlatList //style={{ marginBottom: 130 }}
            data={listemp}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={styles.touchView}
                        // onPress={() => { navigate('') }}
                        disabled={true} >
                        <View >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={styles.textnamestyle}>Date:- </Text>
                                    <Text style={styles.textnamestyle1}>{item.rideDate}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={styles.textnamestyle}>Time:</Text>
                                    <Text style={styles.textnamestyle1}>{item.pickTime}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={styles.textnamestyle}>Location:- </Text>
                                    <Text style={styles.textnamestyle1}>{item.pickLocationName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={styles.textnamestyle}> Name: </Text>
                                    <Text style={styles.textnamestyle1}>{item.empAssignedName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.textnamestyle}>Driver Name:- </Text>
                                <Text style={styles.textnamestyle1}>{item.driverAssignedName}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                {/* <Text style={styles.textnamestyle}>Location:- </Text> */}
                                {/* <Text style={styles.textnamestyle1}>{item.location}</Text> */}
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                {/* <Text style={styles.textnamestyle}>Vehicle No:- </Text> */}
                                {/* <Text style={styles.textnamestyle1}>{item.vehicleNumber}</Text> */}
                            </View>

                            <View style={styles.btnStyle}>
                                <View style={styles.buttonContainerDrop}>
                                    {/* <Text style={styles.textnamestyle1}>{item.dropTime}</Text> */}
                                    {/* <View style={{ marginRight: 10, marginLeft: 20 }}> */}
                                    { <Button title='Approve' //icon={{ name: 'call', color: 'white' }}
                                     onPress={() => rideAprove(item.rideId)}
                                        //disabled={(item.status == "Completed") ? true : false} 
                                        />}
                                    
                                    {/* { <Button title='Cancel' icon={{ name: 'cancel', color: 'white' }} //onPress={() => { navigate('PCancle', [item.driverAssignedId, count, "fromE", rideTypePD, item.rideId]) }}
                                        disabled={(item.status == "Completed") ? true : false} />} */}
                                    


                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                )
            }} />
    </View>
    )
};

const styles = StyleSheet.create({

    touchView: {
        margin: 5,
        // marginHorizontal: 5,
        // padding: 10,
        backgroundColor: 'white',
        // height: 130,
        // minHeight: 70,
        maxHeight: 180,
        justifyContent: 'center',
        // opacity: 1,
    },
    // touchViewD: {
    //     margin: 3,
    //     marginHorizontal: 10,
    //     // marginTop: 10,
    //     padding: 10,
    //     backgroundColor: 'white',
    //     // height: 130,
    //     minHeight: 70,
    //     maxHeight: 180,
    //     justifyContent: 'center',
    //     opacity: 0.7,
    // },
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
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default AdPendingList;