import React from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import Spacer from '../components/Spacer'
import { Button, Card } from 'react-native-elements';
import CardView from 'react-native-cardview'
import { color } from 'react-native-reanimated';
import { navigate } from '../navigationRef'



const HomePage = ({navigation}) => {
    return (


        <View style={styles.mainviewstyle}>
            <View style={styles.viewstyle} >
                <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={10} style={styles.pagestyle}>
                    <Text style={styles.textstyle}> Attendence </Text>
                    
                </CardView>
                <TouchableOpacity style={styles.touchView} onPress = {()=> { navigate('Date')}} >
                    <CardView 
                        // pointerEvents="none"
                        cardElevation={5}
                        cardMaxElevation={5}
                        cornerRadius={10} 
                        onPress = {()=> {console.log('worked')}}>
                        <Text style={styles.textstyle}> Transport </Text>
                        

                    </CardView>
                </TouchableOpacity>


            </View>
            <View style={styles.viewstyle} >
                <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={10} style={styles.pagestyle}>

                    <Text style={styles.textstyle}> T&D </Text>

                </CardView>
                <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={10} style={styles.pagestyle}>

                    <Text style={styles.textstyle}> Voting </Text>

                </CardView>

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
    }
});

export default HomePage;