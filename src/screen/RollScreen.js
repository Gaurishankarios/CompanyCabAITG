import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform, Dimensions } from 'react-native'
import Spacer from '../components/Spacer'
import { Button } from 'react-native-elements';
import CardView from 'react-native-cardview'
import { navigate } from '../navigationRef'
import { CardViewWithIcon, CardViewWithImage } from "react-native-simple-card-view";

const RollScreen = ({ navigation }) => {
    const miniCardStyle = {
        shadowColor: '#000000',
        shadowOffsetWidth: 5,
        shadowOffsetHeight: 5,
        shadowOpacity: 0.1,
        hadowRadius: 10,
        bgColor: '#ffffff',
        padding: 10,
        margin: 10,
        borderRadius: 3,
        elevation: 5,
        width: (Dimensions.get("window").width / 2) - 20
    };
    return (

        // <View style={styles.mainviewstyle}>
        //     <View style={styles.viewstyle} >
        //         <CardView
        //             cardElevation={5}
        //             cardMaxElevation={5}
        //             cornerRadius={10} style={styles.pagestyle}>

        //             <Text style={styles.textstyle}> Employee </Text>

        //         </CardView>

        //         <TouchableOpacity style={styles.touchView} onPress={() => { navigate('Pdlist') }} >
        //             <CardView
        //                 cardElevation={5}
        //                 cardMaxElevation={5}
        //                 cornerRadius={10} >

        //                 <Text style={styles.textstyle}> Driver </Text>
        //             </CardView>
        //         </TouchableOpacity>

        //     </View>
        // </View>


        <View style={styles.container}>
            <View style={{ alignItems: "center", flexDirection: "row", flexWrap: 'wrap', }}>
                {/* <CardViewWithIcon
                    withBackground={false}
                    androidIcon={'car-outline'}
                    iosIcon={'car-outline'}
                    iconHeight={40}
                    iconColor={'#333'}
                    title={'Employee'}
                    contentFontSize={20}
                    titleFontSize={12}
                    style={miniCardStyle}
                /> */}
                {/* <CardViewWithIcon
                    withBackground={false}
                    androidIcon={'logo-youtube'}
                    iosIcon={'logo-youtube'}
                    iconHeight={40}
                    iconColor={'#ff0000'}
                    title={'Driver'}
                    contentFontSize={10}
                    titleFontSize={12}
                    style={miniCardStyle}
                    onPress={() => { navigate('Pdlist') }}
                /> */}

                <CardViewWithImage
                    source={require('../assets/emp.png')}
                    title={'Employee'}
                    imageWidth={80}
                    roundedImage={false}
                    style={miniCardStyle}
                    width={(Dimensions.get("window").width / 2) - 20}
                    onPress={() => { navigate('HomeEmployee') }}   //HomeEmployee
                />
                <CardViewWithImage
                    // width={(200}
                    source={require('../assets/driver.png')}
                    // content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut distinctio!'}
                    title={'Driver'}
                    imageWidth={80}
                    // imageHeight={100}
                    roundedImage={false}
                    style={miniCardStyle}
                    width={(Dimensions.get("window").width / 2) - 20}
                    onPress={() => { navigate('DriverHome') }}  //Pdlist
                />

                


            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    pagestyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 20,
        marginTop: 30,
        backgroundColor: 'white',
        maxWidth: '40%',
        height: 100,
    },
    touchView: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 20,
        marginTop: 30,
        backgroundColor: 'white',
        maxWidth: '40%',
        height: 100,
    },
    viewstyle: {
        flexDirection: 'row',
        marginTop: 40,
        maxHeight: 100,

    },
    mainviewstyle: {
        flexDirection: 'column',
        marginTop: 10,

    },
    // cardstyle: {
    //     flexDirection: 'row',
    //     maxWidth: '40%',
    //     backgroundColor: 'red',
    //     maxHeight: 200,
    //     shadowColor: 'black',
    //     shadowOpacity: 0.5,
    //     borderRadius: 10,
    // },
    textstyle: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: 'rgba(52, 52, 52, 0)',

    },
    container: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 25,
    },
});

export default RollScreen;