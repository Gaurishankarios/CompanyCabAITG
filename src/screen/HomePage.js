import React, {Component} from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Spacer from '../components/Spacer'
import { Button, Card } from 'react-native-elements';
import CardView from 'react-native-cardview'
import { color } from 'react-native-reanimated';
import { navigate } from '../navigationRef'
import { CardViewWithIcon, CardViewWithImage } from "react-native-simple-card-view";



const HomePage = ({ navigation }) => {
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


        <View style={styles.container}>
            <View style={{ alignItems: "center", flexDirection: "row", flexWrap: 'wrap', }}>
                <CardViewWithImage
                    // width={(200}
                    source={require('../assets/fingerprint.png')}
                    // content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut distinctio!'}
                    title={'Attendence'}
                    // imageWidth={80}
                    // imageHeight={100}
                    roundedImage={false}
                    style={miniCardStyle}
                    width={(Dimensions.get("window").width / 2) - 20}
                    // onPress={() => { navigate('Pdlist') }}
                />

                <CardViewWithImage
                    // width={(200}
                    source={require('../assets/transfort.png')}
                    // content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut distinctio!'}
                    title={'Transport'}
                    // imageWidth={100}
                    // imageHeight={100}
                    roundedImage={false}
                    style={miniCardStyle}
                    width={(Dimensions.get("window").width / 2) - 20}
                    onPress={() => { navigate('Role') }}
                />
                <CardViewWithImage
                    // width={(200}
                    source={require('../assets/class.png')}
                    // content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut distinctio!'}
                    title={'T&D'}
                    // imageWidth={80}
                    // imageHeight={100}
                    roundedImage={false}
                    style={miniCardStyle}
                    width={(Dimensions.get("window").width / 2) - 20}
                    // onPress={() => { navigate('Pdlist') }}
                />

                <CardViewWithImage
                    // width={(200}
                    source={require('../assets/voting.png')}
                    // content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut distinctio!'}
                    title={'Voting'}
                    // imageWidth={80}
                    // imageHeight={100}
                    roundedImage={false}
                    style={miniCardStyle}
                    width={(Dimensions.get("window").width / 2) - 20}
                    // onPress={() => { navigate('Pdlist') }}
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
        backgroundColor: 'blue',
        maxWidth: '40%',
        height: 100,
    },
    touchView: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 20,
        marginTop: 30,
        backgroundColor: 'blue',
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
        marginTop: 0,
        // backgroundColor: ''


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
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    container: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 30,
    },
});

export default HomePage;