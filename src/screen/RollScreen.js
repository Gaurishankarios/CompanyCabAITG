import React from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native'
import Spacer from '../components/Spacer'
import { Button } from 'react-native-elements';
import CardView from 'react-native-cardview'
import { navigate } from '../navigationRef'

const RollScreen  = ({navigation}) => {
    return (
        
        <View style={styles.mainviewstyle}>
        <View style={styles.viewstyle} >
            <CardView
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={10} style={styles.pagestyle}>

                <Text style={styles.textstyle}> Employee </Text>

            </CardView>

            <TouchableOpacity style={styles.touchView} onPress = {()=> { navigate('Pdlist')}} >
            <CardView
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={10} >

                <Text style={styles.textstyle}> Driver </Text>

            </CardView>
            </TouchableOpacity>

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
    textstyle:{
        textAlign: 'center',
         color: 'white',
          fontSize: 18,
           fontWeight: 'bold' 
    }
});

export default RollScreen;