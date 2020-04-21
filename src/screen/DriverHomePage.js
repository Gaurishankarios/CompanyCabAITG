import React from 'react'
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform, Dimensions } from 'react-native'
import Spacer from '../components/Spacer'
import { Text, Input, Button } from 'react-native-elements'
import { navigate } from '../navigationRef'
import { CardViewWithIcon, CardViewWithImage } from "react-native-simple-card-view";
import * as Svg from 'react-native-svg';
// import carSVG from "../assets/car3"


const DriverHomePage = () => {


    const miniCardStyle = {
        shadowColor: '#000000',
        shadowOffsetWidth: 5,
        shadowOffsetHeight: 5,
        shadowOpacity: 0.1,
        hadowRadius: 10,
        bgColor: '#ffffff',
        padding: 10,
        // margin: 10,
        borderRadius: 3,
        elevation: 5,
        // width: (Dimensions.get("window").width / 2) - 20
    };

    return (
        <ScrollView>

            <TouchableOpacity style={styles.touchView} onPress={() => { navigate('Pdlist') }}>
                <View style={styles.cardstyle}>
                    <CardViewWithImage
                        source={require('../assets/newcar.svg')} //car-icon.png
                        imageWidth={90}
                        roundedImage={false}
                        style={miniCardStyle}
                        width={(Dimensions.get("window").width / 2) - 40}
                    />
                    <View style={{ width: ((Dimensions.get("window").width / 2) - 5) }}>
                        <Button title="Daily Employee Ride"
                            buttonStyle={{ backgroundColor: '#03106E', padding: 15 }}
                            titleStyle={{
                                color: "white",
                                fontSize: 16,
                            }}
                            onPress={() => { navigate('Pdlist') }}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchView} onPress={() => { navigate('YourRide') }}>
                <View style={styles.cardstyle}>
                    <CardViewWithImage
                        source={require('../assets/your-ride-icon.png')}
                        imageWidth={90}
                        roundedImage={false}
                        style={miniCardStyle}
                        width={(Dimensions.get("window").width / 2) - 40}
                    />
                    <View style={{ width: ((Dimensions.get("window").width / 2) - 5) }}>
                        <Button title="View Your Ride" buttonStyle={{ backgroundColor: '#03106E', padding: 15 }}
                         titleStyle={{
                            color: "white",
                            fontSize: 16,
                        }}
                        onPress={() => { navigate('YourRide') }}
                         />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchView} onPress={() => { navigate('DScheduleRide') }}>
                <View style={styles.cardstyle}>
                    <CardViewWithImage
                        source={require('../assets/schedule-icon.png')}
                        imageWidth={90}
                        roundedImage={false}
                        style={miniCardStyle}
                        width={(Dimensions.get("window").width / 2) - 40}
                    />
                    <View style={{ width: ((Dimensions.get("window").width / 2) - 5) }}>
                        <Button title="Schedule New Ride" buttonStyle={{ backgroundColor: '#03106E', padding: 15 }}
                            titleStyle={{
                                color: "white",
                                fontSize: 16,
                            }}
                            onPress={() => { navigate('DScheduleRide') }}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchView} onPress={() => { navigate('Upload') }}>
                <View style={styles.cardstyle}>
                    <CardViewWithImage
                        source={require('../assets/bills-icon.png')}
                        imageWidth={80}
                        roundedImage={false}
                        style={miniCardStyle}
                        width={(Dimensions.get("window").width / 2) - 40}
                    />
                    <View style={{ width: ((Dimensions.get("window").width / 2) - 5) }}>
                        <Button title="Add Ola/Uber Bill" buttonStyle={{ backgroundColor: '#03106E', padding: 15 }} 
                         titleStyle={{
                            color: "white",
                            fontSize: 16,
                        }}
                        onPress={() => { navigate('Upload') }}
                        />
                    </View>
                </View>
            </TouchableOpacity>


        </ScrollView>

    )
}

const styles = StyleSheet.create({
    touchView: {
        margin: 10,
        // marginTop: 10,
        // backgroundColor: 'lightgrey',
        borderColor: 'black',
        height: 130,
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
    },
    cardstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
});

export default DriverHomePage;